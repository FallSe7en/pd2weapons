#!/usr/bin/perl
use strict;
use warnings;

use Clone qw/clone/;
use HTML::Parser;
use JSON::XS;
use LWP::Simple;

my @attributes = qw/
    total_ammo
    magazine
    damage
    accuracy
    stability
    concealment
    threat
    rate_of_fire
/;
my $current_attribute;

my @weapons = ();

my $current_weapon;
my $current_mod_type;
my $current_mod;

my $in_weapon_table       = 0;

my $get_weapon_name       = 0;
my $get_weapon_attributes = 0;

my $in_mod_section        = 0;
my $get_mod_type          = 0;
my $get_mod_name          = 0;
my $get_mod_attributes    = 0;

sub start_handler
{
    my ($tag_name, $attr) = @_;

    if ($tag_name eq 'table' and $attr->{class} eq'wikitable') {
        $in_weapon_table = 1;

        $current_weapon   = {};
        $current_mod_type = undef;
        $current_mod      = {};

        $get_weapon_name       = 0;
        $get_weapon_attributes = 0;

        $in_mod_section        = 0;
        $get_mod_type          = 0;
        $get_mod_name          = 0;
        $get_mod_attributes    = 0;
    } elsif ($in_weapon_table) {
        if (!$in_mod_section) {
            if ($tag_name eq 'h4') {
                $get_weapon_name = 1;
            } elsif (
                $tag_name eq 'tr'
                and $current_weapon->{name}
                and !$current_weapon->{attributes}
            ) {
                $get_weapon_attributes = 1;
                $current_weapon->{attributes} = {};
                $current_attribute = 0;
            } elsif ($tag_name eq 'td' and exists($attr->{rowspan})) {
                $in_mod_section    = 1;
                $get_mod_type      = 1;
                $current_mod       = { slot => $current_mod_type };
                $current_attribute = 0;
            }
        } else {
            if ($tag_name eq 'a') {
                if ($current_mod->{name}) {
                    push @{ $current_weapon->{modifications} }, $current_mod;
                }

                $get_mod_name       = 1;
                $current_mod        = { slot => $current_mod_type };
                $current_attribute  = -2;
                $get_mod_attributes = 1;
            } elsif ($tag_name eq 'td' and $current_mod->{name}) {
                $current_attribute++;
            } elsif ($tag_name eq 'td' and exists($attr->{rowspan})) {
                $in_mod_section    = 1;
                $get_mod_type      = 1;
                $current_mod       = { slot => $current_mod_type };
                $current_attribute = 0;
            }
        }
    }
}

sub end_handler
{
    my ($tag_name) = @_;

    if ($tag_name eq 'table' and $in_weapon_table) {
        $in_weapon_table = 0;
        push @weapons, clone($current_weapon);
    } elsif ($tag_name eq 'h4') {
        $get_weapon_name = 0;
    } elsif ($tag_name eq 'tr' and $get_weapon_attributes) {
        $get_weapon_attributes = 0;
    } elsif ($tag_name eq 'td' and $get_mod_type) {
        $get_mod_type = 0;
    } elsif ($tag_name eq 'a' and $get_mod_name) {
        $get_mod_name = 0;
    } elsif ($tag_name eq 'tr' and $get_mod_attributes) {
        $get_mod_attributes = 0;
        push @{ $current_weapon->{modifications} }, clone($current_mod);
        $current_mod = {};
    }
}

sub text_handler
{
    my ($text) = @_;

    $text = _trim($text);

    if ($get_weapon_name) {
        $current_weapon->{name} ||= $text;
    } elsif ($get_weapon_attributes) {
        if (my $attribute = $attributes[$current_attribute++]) {
            $current_weapon->{attributes}->{_camelize($attribute)} = $text;
        }
    } elsif ($get_mod_type) {
        $current_mod_type = $text;
    } elsif ($get_mod_name) {
        $current_mod->{name} = $text;
    } elsif ($get_mod_attributes) {
        if (my $attribute = $attributes[$current_attribute]) {
            $current_mod->{_camelize($attribute)} ||= $text;
        }
    }
}

sub _trim
{
    (my $text = shift) =~ s/^\s+|\s+$//g;
    return $text;
}

sub _strip
{
    (my $text = shift) =~ s/\s//g;
    return ucfirst _camelize($text);
}

sub _camelize
{
    my @words = split /_/, shift;

    my $final = shift(@words);
    $final .= ucfirst($_) for (@words);

    return $final;
}


my ($source, $output_directory) = @ARGV;

if (!$source && !$output_directory) {
die <<HERE;
perl fetch_data.pl SOURCE OUTPUT_DIRECTORY

    SOURCE
        Can be either a URL (currently http://payday.wikia.com/wiki/Weapon_stats) or a filename.

    OUTPUT_DIRECTORY
        Directory to output weapon data files to.
HERE
}

my $p = HTML::Parser->new(
    api_version => 3,
    handlers    => {
        start => [ \&start_handler, 'tagname, attr' ],
        end   => [ \&end_handler,   'tagname'       ],
        text  => [ \&text_handler,  'dtext'         ],
    },
);

if ($source =~ /^http:/) {
    $p->parse(get($source)) || die "Could not parse file: $!";
} else {
    $p->parse_file($source) || die "Could not parse file: $!";
}

foreach my $weapon (@weapons) {
    open(
        my $file,
        '>',
        "$output_directory/@{[ _strip($weapon->{name}) ]}.js",
    ) or die "Could not open for write: $!";

    print $file <<HERE;
define([], function () {
    return @{[ encode_json($weapon) ]};
});
HERE

    close($file);
}

open(my $file, '>', "$output_directory/../data.js") or die "Could not open for write: $!";

my @weapon_names = map { _strip($_->{name}) } @weapons;

    print $file <<HERE;
define([
    @{[ join ",\n    ", map { "data/$_" } @weapon_names ]}
], function (
    @{[ join ",\n    ", @weapon_names]}
) {
    return [
        @{[ join ",\n        ", @weapon_names ]}
    ];
});
HERE

close($file);
