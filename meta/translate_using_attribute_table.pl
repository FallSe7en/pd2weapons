#!/usr/bin/perl
use strict;
use warnings;

use Clone qw/clone/;
use File::Basename;
use File::Slurp;
use JSON::XS;
use POSIX qw/ceil floor/;

use Data::Dumper;

my ($in_dir, $out_dir) = @ARGV;
$out_dir =~ s/\/$//;

my %attribute_tables = (
    damage => [
        10, 11,   12, 13,   14, 15,   16,  17.5, 20,  22.5, 25, 27.5,
        30, 32.5, 35, 37.5, 40, 42.5, 45,  47.5, 50,  55,   60, 65,
        70, 75,   80, 85,   90, 95,   100, 105,  110, 115,  120
    ],
    accuracy  => [ 0, 2, 4, 6, 8,    10, 12,   14, 16, 18 ],
    stability => [ 0, 3, 6, 8, 12.5, 15, 17.5, 19, 20, 20, 21, 22, 23, 24, 25 ],
#    threat => [
#        4.5, 3.9, 3.6, 3.3, 3,   2.8, 2.6, 2.4, 2.2, 1.6,
#        1.5, 1.4, 1.3, 1.2, 1.1, 1,   0.8, 0.6, 0.4, 0.2
#    ],
);

opendir(my ($dh), $in_dir) or die "Could not open directory $in_dir: $!";
my @files = grep { $_ ne '.' and $_ ne '..' } readdir $dh;
closedir $dh;

foreach my $file (@files) {
    my $contents = read_file("$in_dir/$file");

    if ($contents =~ /return (\{.+\});/) {
        my $weapon            = decode_json($1);
        my $translated_weapon = clone($weapon);

        my %weapon_attributes = ();

        print "Translating: @{[ $weapon->{name} ]}...\n";

        foreach my $attribute (keys %{ $weapon->{attributes} }) {
            my $value = $weapon_attributes{$attribute}
                      = $weapon->{attributes}->{$attribute};

            $translated_weapon
                ->{attributes}
                ->{$attribute} = determine_index_in_attribute_table($attribute, $value);
        }

        my $i = 0;
        foreach my $mod (@{ $weapon->{modifications} }) {
            print "\tTranslating: @{[ $mod->{name} ]}...\n";

            foreach my $attribute (keys %{ $mod->{attributes} }) {
                my $value = ($weapon_attributes{$attribute} || 0)
                          + ($mod->{attributes}->{$attribute} || 0);

                $translated_weapon
                    ->{modifications}
                    ->[$i]
                    ->{attributes}
                    ->{$attribute} = (
                        (determine_index_in_attribute_table($attribute, $value) || 0)
                        - ($translated_weapon->{attributes}->{$attribute} || 0)
                    ); 
            }

            $i++;
        }

        my $filename = basename($file, '.js');
        write_file("$out_dir/$filename.js", <<HERE);
define([], function () {
    return @{[ encode_json($translated_weapon) ]};
});
HERE
    } else {
        warn "Failed to parse: $file";
    }
}

sub determine_index_in_attribute_table
{
    my ($attribute, $value) = @_;

    my $table = $attribute_tables{$attribute};

    if ($table) {
        for (my $i = 0; $i < scalar(@$table); $i++) {
            return $i if (
                floor($table->[$i]) == ($value || 0)
                or ceil($table->[$i]) == ($value || 0)
            );
        }

        print "\t\tUnable to translate: $attribute, $value\n";
    } else {
        return $value;
    }
}
