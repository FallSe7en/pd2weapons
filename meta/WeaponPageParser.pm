package WeaponPageParser;
use strict;
use warnings;

our (@ISA, @EXPORT);

BEGIN {
    require Exporter;
    @ISA = qw/Exporter/;

    @EXPORT = qw/parse_weapon_page/;
}

use Clone qw/clone/;
use HTML::Parser;
use LWP::Simple;

my $IMAGE_DIRECTORY;

my %weapon;
my %mod;

my (
    $current_attribute,

    $in_weapon_attribute_table,

    $get_weapon_name,
    $get_weapon_attribute,

    $found_weapon_mod_table,
    $in_weapon_mod_table,

    $get_mod_name,
    $found_mod_attribute_table,
    $get_mod_attribute,
    $get_mod_attribute_value,
);

sub parse_weapon_page
{
    my ($page, $image_directory) = @_;

    $IMAGE_DIRECTORY = $image_directory;

    _init_weapon();
    _init_mod();

    $current_attribute = undef;

    $in_weapon_attribute_table = 0;

    $get_weapon_name           = 0;
    $get_weapon_attribute      = 0;

    $found_weapon_mod_table    = 0;
    $in_weapon_mod_table       = 0;

    $get_mod_name              = 0;
    $found_mod_attribute_table = 0;
    $get_mod_attribute         = 0;

    my $p = HTML::Parser->new(
        api_version => 3,
        handlers => {
            start => [ \&start_handler, 'tagname, attr' ],
            end   => [ \&end_handler,   'tagname'       ],
            text  => [ \&text_handler,  'dtext'         ],
        },
    );

    if ($page =~ /^http/) {
        $p->parse(get($page));
    } else {
        $p->parse_file($page);
    }

    return clone(\%weapon);
}

my %attributes = (
    # Weapons-specific
    'Price'        => 'price',

    # Mods-specific
    'Cost'         => 'price',
    'Mod slot'     => 'slot',

    # General
    'Rate of fire' => 'rateOfFire',
    'Total ammo'   => 'totalAmmo',
    'Magazine'     => 'magazine',
    'Damage'       => 'damage',
    'Accuracy'     => 'accuracy',
    'Stability'    => 'stability',
    'Concealment'  => 'concealment',
    'Threat'       => 'threat',
);

sub _trim
{
    (my $text = shift) =~ s/^\s+|\s+$//g;
    return $text;
}

sub _trim_number
{
    (my $text = shift) =~ s/[^\-0-9.]//g;
    return $text;
}

sub _init_weapon
{
    %weapon = (
        name          => '',
        attributes    => {},
        modifications => [],
        imageUrl      => '',
    );

    $weapon{attributes}{$_} = undef for qw/
        price
        rateOfFire
        totalAmmo
        magazine
        damage
        accuracy
        stability
        concealment
        threat
    /;
}

sub _init_mod
{
    %mod = (
        name       => '',
        slot       => '',
        attributes => {},
        imageUrl   => '',
    );

    $mod{attributes}{$_} = undef for qw/
        price
        slot
        rateOfFire
        totalAmmo
        magazine
        damage
        accuracy
        stability
        concealment
        threat
    /;
}

sub _warn_img_download
{
    my ($src, $img, $response) = @_;

    warn "Error downloading: $src -> $img (Response received: $response)";
}

sub start_handler
{
    my ($tag_name, $attr) = @_;

    if ($tag_name eq 'table' and ($attr->{class} || '') eq 'infobox') {
        $in_weapon_attribute_table = 1;
    } elsif ($in_weapon_attribute_table) {
        if ($tag_name eq 'th') {
            $get_weapon_name = 1;
        } elsif ($tag_name eq 'img') {
            (my $img_name = $weapon{name} . '.png') =~ s/ /_/g;
            my $response = getstore($attr->{src}, "$IMAGE_DIRECTORY/$img_name");

            if ($response == 200) {
                $weapon{imageUrl} = $img_name;
            } else {
                _warn_img_download($attr->{src}, $img_name, $response);
            }
        } elsif ($tag_name eq 'tr') {
            $get_weapon_attribute = 1;
        }
    }

    elsif ($tag_name eq 'h4') {
        $get_mod_name = 1;
    } elsif ($tag_name eq 'div' and ($attr->{class} || '') eq 'weapon_mod clearfix') {
        $found_weapon_mod_table = 1;
    } elsif ($found_weapon_mod_table and $tag_name eq 'div') {
        $in_weapon_mod_table = 1;
    } elsif ($in_weapon_mod_table and $tag_name eq 'table') {
        $found_weapon_mod_table = 1;
    } elsif ($found_weapon_mod_table) {
        if ($tag_name eq 'table') {
            $found_mod_attribute_table = 1;
        } elsif ($found_mod_attribute_table and $tag_name eq 'th') {
            $get_mod_attribute = 1;
        } elsif ($found_mod_attribute_table and $tag_name eq 'td') {
            $get_mod_attribute_value = 1;
        } elsif ($tag_name eq 'img') {
            (my $img_name = $weapon{name} . '_' . $mod{name} . '.png') =~ s/ /_/g;
            my $response = getstore($attr->{src}, "$IMAGE_DIRECTORY/$img_name");

            if ($response == 200) {
                $mod{imageUrl} = $img_name;
            } else {
                _warn_img_download($attr->{src}, $img_name, $response);
            }
        }
    }
}

sub end_handler
{
    my ($tag_name) = @_;

    if ($in_weapon_attribute_table and $tag_name eq 'table') {
        $in_weapon_attribute_table = 0;
    } elsif ($get_weapon_name and $tag_name eq 'th') {
        $get_weapon_name = 0;
    } elsif ($get_weapon_attribute and $tag_name eq 'tr') {
        $get_weapon_attribute = 0;
    }
    
    elsif ($get_mod_name and $tag_name eq 'h4') {
        $get_mod_name = 0;
    } elsif ($in_weapon_mod_table and $tag_name eq 'div') {
        $in_weapon_mod_table = 0;
    } elsif ($found_weapon_mod_table and $tag_name eq 'table') {
        $found_weapon_mod_table = 0;
        push @{ $weapon{modifications} }, clone(\%mod);
        _init_mod();
    } elsif ($found_mod_attribute_table and $tag_name eq 'table') {
        $found_mod_attribute_table = 0;
    } elsif ($get_mod_attribute and $tag_name eq 'th') {
        $get_mod_attribute = 0;
    } elsif ($get_mod_attribute_value and $tag_name eq 'td') {
        $get_mod_attribute_value = 0;
    }
}

sub text_handler
{
    my $text = _trim(shift);

    if ($get_weapon_name) {
        $weapon{name} = $text;
    } elsif ($get_weapon_attribute && $text) {
        if ($current_attribute && $text) {
            $weapon{attributes}{$current_attribute} = _trim_number($text);

            $current_attribute = undef;
        } else {
            $current_attribute = $attributes{$text};
        }
    } elsif ($get_mod_name) {
        $mod{name} = $text;
    } elsif ($get_mod_attribute and (my $attribute = $attributes{$text})) {
        $current_attribute = $attribute;
    } elsif ($get_mod_attribute_value && $current_attribute && $text) {
        if ($current_attribute eq 'slot') {
            $mod{slot} = $text;
        } else {
            $mod{attributes}{$current_attribute} = _trim_number($text);
        }

        $current_attribute = undef;
    }
}

1;
