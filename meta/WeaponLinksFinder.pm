package WeaponLinksFinder;
use strict;
use warnings;

our (@ISA, @EXPORT);

BEGIN {
    require Exporter;
    @ISA = qw/Exporter/;

    @EXPORT = qw/find_weapon_links/;
}

use HTML::Parser;
use LWP::Simple;

my @links = ();

my ($found_table, $found_row, $found_cell);

sub find_weapon_links
{
    my $page = shift;

    my $p = HTML::Parser->new(
        api_version => 3,
        handlers => {
            start => [ \&start_handler, 'tagname, attr' ],
            end   => [ \&end_handler,   'tagname'       ],
        },
    );

    $found_table = 0;
    $found_row   = 0;
    $found_cell  = 0;

    if ($page =~ /^http/) {
        $p->parse(get($page));
    } else {
        $p->parse_file($page);
    }

    return \@links;
}

sub start_handler
{
    my ($tag_name, $attr) = @_;

    if ($tag_name eq 'table' and $attr->{class} ne 'navbox') {
        $found_table = 1;
    } elsif ($found_table and $tag_name eq 'tr') {
        $found_row = 1;
    } elsif ($found_row and $tag_name eq 'td') {
        $found_cell = 1;
    } elsif ($found_cell and $tag_name eq 'a') {
        push @links, $attr->{href};

        $found_row  = 0;
        $found_cell = 0;
    }
}

sub end_handler
{
    my ($tag_name) = @_;

    if ($found_table and $tag_name eq 'table') {
        $found_table = 0;
    }
}

1;
