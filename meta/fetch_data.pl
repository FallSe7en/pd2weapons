#!/usr/bin/perl
use strict;
use warnings;

use JSON::XS;

use WeaponLinksFinder;
use WeaponPageParser;

my ($source, $data_out, $img_out) = @ARGV;

if (!$source && !$data_out) {
    die <<HERE;
perl fetch_data.pl SOURCE DATA_OUT IMG_OUT

    SOURCE
        URL of page w/ all links to weapons pages.

    DATA_OUT
        Directory to output weapon data files to.

    IMG_OUT
        Directory to output weapon/mod images to.
HERE
}

sub _trim
{
    (my $text = shift) =~ s/^\s+|\s+$//g;
    return $text;
}

sub _camelize
{
    my @words = split /_/, shift;

    my $final = shift(@words);
    $final .= ucfirst($_) for (@words);

    return $final;
}

sub _strip
{
    my $text = shift;

    $text =~ s/[^A-Za-z0-9]//g;
    $text =~ s/\s//g;

    return ucfirst(_camelize($text));
}

my $base_url;

if ($source =~ /^(.+\.com)/) {
    $base_url = $1;
} else {
    die 'Could not parse URL.';
}

my @links = map {
    $base_url . $_
} @{ find_weapon_links($source) };
print "@{[ scalar @links ]} found.\n";

my @weapons = map {
    print "Scraping: $_\n";
    parse_weapon_page($_, $img_out);
} @links;

print "Outputting weapon data...\n";

foreach my $weapon (@weapons) {
    open(
        my $file,
        '>',
        "$data_out/@{[ _strip($weapon->{name}) ]}.js",
    ) or die "Could not open for write: $!";

    print $file <<HERE;
define([], function () {
    return @{[ encode_json($weapon) ]};
});
HERE

    close($file);
}

open(my $file, '>', "$data_out/../data.js") or die "Could not open for write: $!";

my @weapon_names = map { _strip($_->{name}) } @weapons;

    print $file <<HERE;
define([
    @{[ join ",\n    ", map { qq|"data/$_"| } @weapon_names ]}
], function (
    @{[ join ",\n    ", @weapon_names]}
) {
    return [
        @{[ join ",\n        ", @weapon_names ]}
    ];
});
HERE

close($file);

print "Done.\n";
