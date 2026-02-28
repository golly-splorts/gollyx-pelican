/*jslint onevar: true, undef: false, nomen: true, eqeqeq: true, plusplus: false, bitwise: true, regexp: true, newcap: true, immed: true  */

/**
 * Game of Life - JS & CSS
 * Pedro Verruma (http://pmav.eu)
 * 04 September 2010
 *
 * Major modifications by Charles Reid (https://github.com/charlesreid1)
 * 12 February 2018
 * 11 July 2019
 *
 * Major modifications by Ch4zm of Hellmouth (https://github.com/ch4zm)
 * 26 October 2020
 */

(function () {

  var realBackgroundColor = "#060606";
  var gridStrokeColor1    = "#3a3a3a";
  var mapZoneStrokeColor  = "#dddddd";
  var grays = ["#3a3a3a", "#404040"];

  var ruleNames = {
    "Rule 14 Electric Blackbird": "000000000000000000222111210",
    "Rule 14 Quantum Pelican": "000000000000000000212211210",
    "Rule 14 Thermophilic Stitchbird": "000000000000000000122121210",
    "Rule 14 Deep Water Harrier": "000000000000000000112221210",
    "Rule 14 Swamp Sandgrouse": "000000000000000000122211210",
    "Rule 14 Cave Woodpecker": "000000000000000000212121210",
    "Rule 14 Electric Wind Spider": "000000000000000000221112120",
    "Rule 14 Quantum Funnel Spider": "000000000000000000211212120",
    "Rule 14 Thermophilic Sac Spider": "000000000000000000121122120",
    "Rule 14 Deep Water Tick": "000000000000000000111222120",
    "Rule 14 Swamp Shepherd Spider": "000000000000000000121212120",
    "Rule 14 Cave Vampire Spider": "000000000000000000211122120",
    "Rule 18 Pelican": "000000002000000001000000210",
    "Rule 18 Jumping Spider": "000000001000000002000000120",
    "Rule 30 Electric Dove": "000000002000000001222111210",
    "Rule 30 Quantum Cukoo": "000000002000000001212211210",
    "Rule 30 Thermophilic Stork": "000000002000000001122121210",
    "Rule 30 Deep Water Shrike": "000000002000000001112221210",
    "Rule 30 Swamp Moa": "000000002000000001122211210",
    "Rule 30 Cave Dove": "000000002000000001212121210",
    "Rule 30 Electric Spider Mite": "000000001000000002221112120",
    "Rule 30 Quantum Tube Spider": "000000001000000002211212120",
    "Rule 30 Thermophilic Silk Spider": "000000001000000002121122120",
    "Rule 30 Deep Water Lampshade Spider": "000000001000000002111222120",
    "Rule 30 Swamp Camel Spider": "000000001000000002121212120",
    "Rule 30 Cave Sea Spider": "000000001000000002211122120",
    "Rule 60 Electric Magpie": "000000222000000111222111000",
    "Rule 60 Quantum Wagtail": "000000212000000211212211000",
    "Rule 60 Thermophilic Wagtail": "000000122000000121122121000",
    "Rule 60 Deep Water Frogmouth": "000000112000000221112221000",
    "Rule 60 Swamp Warbler": "000000122000000211122211000",
    "Rule 60 Cave Longspur": "000000212000000121212121000",
    "Rule 60 Electric Funnel Spider": "000000221000000112221112000",
    "Rule 60 Quantum Jumping Spider": "000000211000000212211212000",
    "Rule 60 Thermophilic Wind Spider": "000000121000000122121122000",
    "Rule 60 Deep Water Sun Spider": "000000111000000222111222000",
    "Rule 60 Swamp Tube Spider": "000000121000000212121212000",
    "Rule 60 Cave Spider Mite": "000000211000000122211122000",
    "Rule 62 Electric Bristlehead": "000000222000000111222111210",
    "Rule 62 Quantum Gull": "000000212000000211212211210",
    "Rule 62 Thermophilic Oriole": "000000122000000121122121210",
    "Rule 62 Deep Water Fantail": "000000112000000221112221210",
    "Rule 62 Swamp Stork": "000000122000000211122211210",
    "Rule 62 Cave Penguin": "000000212000000121212121210",
    "Rule 62 Electric Termite Hunter": "000000221000000112221112120",
    "Rule 62 Quantum Wolf Spider": "000000211000000212211212120",
    "Rule 62 Thermophilic Tarantula": "000000121000000122121122120",
    "Rule 62 Deep Water Jumping Spider": "000000111000000222111222120",
    "Rule 62 Swamp Spider Mite": "000000121000000212121212120",
    "Rule 62 Cave Woodlouse Spider": "000000211000000122211122120",
    "Rule 86 Electric Jay": "002002002001001001002001210",
    "Rule 86 Quantum Oriole": "002001002002001001002001210",
    "Rule 86 Thermophilic Eagle": "001002002001002001002001210",
    "Rule 86 Deep Water Toucan": "001001002002002001002001210",
    "Rule 86 Swamp Pigeon": "001002002002001001002001210",
    "Rule 86 Cave Eagle": "002001002001002001002001210",
    "Rule 86 Electric Camel Spider": "002002001001001002001002120",
    "Rule 86 Quantum Cellar Spider": "002001001002001002001002120",
    "Rule 86 Thermophilic Orb Weaver": "001002001001002002001002120",
    "Rule 86 Deep Water Cellar Spider": "001001001002002002001002120",
    "Rule 86 Swamp Sac Spider": "001002001002001002001002120",
    "Rule 86 Cave Lampshade Spider": "002001001001002002001002120",
    "Rule 90 Electric Harrier": "002002002001001001220110210",
    "Rule 90 Quantum Wattlebird": "002001002002001001210210210",
    "Rule 90 Thermophilic Heron": "001002002001002001120120210",
    "Rule 90 Deep Water Oystercatcher": "001001002002002001110220210",
    "Rule 90 Swamp Owl": "001002002002001001120210210",
    "Rule 90 Cave Waterfowl": "002001002001002001210120210",
    "Rule 90 Electric Pseudoscorpion": "002002001001001002220110120",
    "Rule 90 Quantum Weaver Spider": "002001001002001002210210120",
    "Rule 90 Thermophilic Troglobite Spider": "001002001001002002120120120",
    "Rule 90 Deep Water Claw Spider": "001001001002002002110220120",
    "Rule 90 Swamp Spider Mite": "001002001002001002120210120",
    "Rule 90 Cave Shepherd Spider": "002001001001002002210120120",
    "Rule 102 Electric Sheathbill": "002002220001001110002001210",
    "Rule 102 Quantum Frogmouth": "002001210002001210002001210",
    "Rule 102 Thermophilic Magpie": "001002120001002120002001210",
    "Rule 102 Deep Water Blackbird": "001001110002002220002001210",
    "Rule 102 Swamp Skimmer": "001002120002001210002001210",
    "Rule 102 Cave Egret": "002001210001002120002001210",
    "Rule 102 Electric Armor Spider": "002002220001001110001002120",
    "Rule 102 Quantum Endeostigmata": "002001210002001210001002120",
    "Rule 102 Thermophilic Mite": "001002120001002120001002120",
    "Rule 102 Deep Water Termite Hunter": "001001110002002220001002120",
    "Rule 102 Swamp Mouse Spider": "001002120002001210001002120",
    "Rule 102 Cave Tick": "002001210001002120001002120",
    "Rule 106 Electric Songbird": "002002220001001110220110210",
    "Rule 106 Quantum Eagle": "002001210002001210210210210",
    "Rule 106 Thermophilic Nightjar": "001002120001002120120120210",
    "Rule 106 Deep Water Bristlehead": "001001110002002220110220210",
    "Rule 106 Swamp Crow": "001002120002001210120210210",
    "Rule 106 Cave Kite": "002001210001002120210120210",
    "Rule 106 Electric Funnel Spider": "002002220001001110220110120",
    "Rule 106 Quantum Redberry Mite": "002001210002001210210210120",
    "Rule 106 Thermophilic Scorpion": "001002120001002120120120120",
    "Rule 106 Deep Water Spider Mite": "001001110002002220110220120",
    "Rule 106 Swamp Spider Mite": "001002120002001210120210120",
    "Rule 106 Cave Sun scorpion": "002001210001002120210120120",
    "Rule 110 Electric Eagle": "002002220001001110222111210",
    "Rule 110 Quantum Crow": "002001210002001210212211210",
    "Rule 110 Thermophilic Crane": "001002120001002120122121210",
    "Rule 110 Deep Water Trumpeter": "001001110002002220112221210",
    "Rule 110 Swamp Toucan": "001002120002001210122211210",
    "Rule 110 Cave Martin": "002001210001002120212121210",
    "Rule 110 Electric Wind Spider": "002002220001001110221112120",
    "Rule 110 Quantum Wind Spider": "002001210002001210211212120",
    "Rule 110 Thermophilic Ground Spider": "001002120001002120121122120",
    "Rule 110 Deep Water Wolf Spider": "001001110002002220111222120",
    "Rule 110 Swamp Scorpion": "001002120002001210121212120",
    "Rule 110 Cave Sun Spider": "002001210001002120211122120",
    "Rule 120 Electric Gosbeak": "002002222001001111220110000",
    "Rule 120 Quantum Kingfisher": "002001212002001211210210000",
    "Rule 120 Thermophilic Skimmer": "001002122001002121120120000",
    "Rule 120 Deep Water Shoebills": "001001112002002221110220000",
    "Rule 120 Swamp Egret": "001002122002001211120210000",
    "Rule 120 Cave Drongo": "002001212001002121210120000",
    "Rule 120 Electric Ground Spider": "002002221001001112220110000",
    "Rule 120 Quantum Tube Spider": "002001211002001212210210000",
    "Rule 120 Thermophilic Sun Spider": "001002121001002122120120000",
    "Rule 120 Deep Water Sun Spider": "001001111002002222110220000",
    "Rule 120 Swamp Orb Weaver": "001002121002001212120210000",
    "Rule 120 Cave Sac Spider": "002001211001002122210120000",
    "Rule 122 Electric Lark": "002002222001001111220110210",
    "Rule 122 Quantum Kiwi": "002001212002001211210210210",
    "Rule 122 Thermophilic Turkey": "001002122001002121120120210",
    "Rule 122 Deep Water Mousebird": "001001112002002221110220210",
    "Rule 122 Swamp Pigeon": "001002122002001211120210210",
    "Rule 122 Cave Oriole": "002001212001002121210120210",
    "Rule 122 Electric Violin Spider": "002002221001001112220110120",
    "Rule 122 Quantum Sun scorpion": "002001211002001212210210120",
    "Rule 122 Thermophilic Claw Spider": "001002121001002122120120120",
    "Rule 122 Deep Water Orb Weaver": "001001111002002222110220120",
    "Rule 122 Swamp Orb Weaver": "001002121002001212120210120",
    "Rule 122 Cave Cellar Spider": "002001211001002122210120120",
    "Rule 124 Electric Harrier": "002002222001001111222111000",
    "Rule 124 Quantum Buzzard": "002001212002001211212211000",
    "Rule 124 Thermophilic Frogmouth": "001002122001002121122121000",
    "Rule 124 Deep Water Ploughbill": "001001112002002221112221000",
    "Rule 124 Swamp Flamingo": "001002122002001211122211000",
    "Rule 124 Cave Toucan": "002001212001002121212121000",
    "Rule 124 Electric Cellar Spider": "002002221001001112221112000",
    "Rule 124 Quantum Sun Spider": "002001211002001212211212000",
    "Rule 124 Thermophilic Weaver Spider": "001002121001002122121122000",
    "Rule 124 Deep Water Camel Spider": "001001111002002222111222000",
    "Rule 124 Swamp Scorpion": "001002121002001212121212000",
    "Rule 124 Cave Orb Weaver": "002001211001002122211122000",
    "Rule 150 Full Moon Warbler": "220210002210110001002001210",
    "Rule 150 New Moon Buzzard": "110120002120220001002001210",
    "Rule 150 Half Moon Thrush": "220110002220110001002001210",
    "Rule 150 Waning Gibbous Cardinal": "220220002110110001002001210",
    "Rule 150 Waning Crescent Falcon": "110110002220220001002001210",
    "Rule 150 Waxing Gibbous Ploughbill": "210210002210210001002001210",
    "Rule 150 Waxing Crescent Hummingbird": "120120002120120001002001210",
    "Rule 150 Full Moon Camel Spider": "220210001210110002001002120",
    "Rule 150 New Moon Violin Spider": "110120001120220002001002120",
    "Rule 150 Half Moon Troglobite Spider": "220110001220110002001002120",
    "Rule 150 Waning Gibbous Jumping Spider": "220220001110110002001002120",
    "Rule 150 Waning Crescent Woodlouse Spider": "110110001220220002001002120",
    "Rule 150 Waxing Gibbous Wind Spider": "210210001210210002001002120",
    "Rule 150 Waxing Crescent Tarantula": "120120001120120002001002120",
    "Rule 154 Full Moon Electric Eagle": "220210002210110001220110210",
    "Rule 154 New Moon Electric Buttonquail": "110120002120220001220110210",
    "Rule 154 Half Moon Electric Owl": "220110002220110001220110210",
    "Rule 154 Waning Gibbous Electric Flycatcher": "220220002110110001220110210",
    "Rule 154 Waning Crescent Electric Egret": "110110002220220001220110210",
    "Rule 154 Waxing Gibbous Electric Sandgrouse": "210210002210210001220110210",
    "Rule 154 Waxing Crescent Electric Eagle": "120120002120120001220110210",
    "Rule 154 Full Moon Quantum Stork": "220210002210110001210210210",
    "Rule 154 New Moon Quantum Crane": "110120002120220001210210210",
    "Rule 154 Half Moon Quantum Babbler": "220110002220110001210210210",
    "Rule 154 Waning Gibbous Quantum Harrier": "220220002110110001210210210",
    "Rule 154 Waning Crescent Quantum Cukoo": "110110002220220001210210210",
    "Rule 154 Waxing Gibbous Quantum Fantail": "210210002210210001210210210",
    "Rule 154 Waxing Crescent Quantum Wattlebird": "120120002120120001210210210",
    "Rule 154 Full Moon Thermophilic Falcon": "220210002210110001120120210",
    "Rule 154 New Moon Thermophilic Turkey": "110120002120220001120120210",
    "Rule 154 Half Moon Thermophilic Magpie": "220110002220110001120120210",
    "Rule 154 Waning Gibbous Thermophilic Crane": "220220002110110001120120210",
    "Rule 154 Waning Crescent Thermophilic Parrot": "110110002220220001120120210",
    "Rule 154 Waxing Gibbous Thermophilic Shoebills": "210210002210210001120120210",
    "Rule 154 Waxing Crescent Thermophilic Penguin": "120120002120120001120120210",
    "Rule 154 Full Moon Deep Water Loon": "220210002210110001110220210",
    "Rule 154 New Moon Deep Water Gull": "110120002120220001110220210",
    "Rule 154 Half Moon Deep Water Buzzard": "220110002220110001110220210",
    "Rule 154 Waning Gibbous Deep Water Falcon": "220220002110110001110220210",
    "Rule 154 Waning Crescent Deep Water Buttonquail": "110110002220220001110220210",
    "Rule 154 Waxing Gibbous Deep Water Skimmer": "210210002210210001110220210",
    "Rule 154 Waxing Crescent Deep Water Buzzard": "120120002120120001110220210",
    "Rule 154 Full Moon Swamp Boobie": "220210002210110001120210210",
    "Rule 154 New Moon Swamp Finch": "110120002120220001120210210",
    "Rule 154 Half Moon Swamp Broadbill": "220110002220110001120210210",
    "Rule 154 Waning Gibbous Swamp Wattlebird": "220220002110110001120210210",
    "Rule 154 Waning Crescent Swamp Moa": "110110002220220001120210210",
    "Rule 154 Waxing Gibbous Swamp Mousebird": "210210002210210001120210210",
    "Rule 154 Waxing Crescent Swamp Blackbird": "120120002120120001120210210",
    "Rule 154 Full Moon Cave Harrier": "220210002210110001210120210",
    "Rule 154 New Moon Cave Wagtail": "110120002120220001210120210",
    "Rule 154 Half Moon Cave Shrike": "220110002220110001210120210",
    "Rule 154 Waning Gibbous Cave Vulture": "220220002110110001210120210",
    "Rule 154 Waning Crescent Cave Wattlebird": "110110002220220001210120210",
    "Rule 154 Waxing Gibbous Cave Songbird": "210210002210210001210120210",
    "Rule 154 Waxing Crescent Cave Puffin": "120120002120120001210120210",
    "Rule 154 Full Moon Electric Jumping Spider": "220210001210110002220110120",
    "Rule 154 New Moon Electric Weaver Spider": "110120001120220002220110120",
    "Rule 154 Half Moon Electric Camel Spider": "220110001220110002220110120",
    "Rule 154 Waning Gibbous Electric Cheese Mite": "220220001110110002220110120",
    "Rule 154 Waning Crescent Electric Funnel Spider": "110110001220220002220110120",
    "Rule 154 Waxing Gibbous Electric Troglobite Spider": "210210001210210002220110120",
    "Rule 154 Waxing Crescent Electric Shepherd Spider": "120120001120120002220110120",
    "Rule 154 Full Moon Quantum Claw Spider": "220210001210110002210210120",
    "Rule 154 New Moon Quantum Funnel Spider": "110120001120220002210210120",
    "Rule 154 Half Moon Quantum Armor Spider": "220110001220110002210210120",
    "Rule 154 Waning Gibbous Quantum Sea Spider": "220220001110110002210210120",
    "Rule 154 Waning Crescent Quantum Wolf Spider": "110110001220220002210210120",
    "Rule 154 Waxing Gibbous Quantum Claw Spider": "210210001210210002210210120",
    "Rule 154 Waxing Crescent Quantum Tick": "120120001120120002210210120",
    "Rule 154 Full Moon Thermophilic Sun Spider": "220210001210110002120120120",
    "Rule 154 New Moon Thermophilic Mite": "110120001120220002120120120",
    "Rule 154 Half Moon Thermophilic Wind Spider": "220110001220110002120120120",
    "Rule 154 Waning Gibbous Thermophilic Sun Spider": "220220001110110002120120120",
    "Rule 154 Waning Crescent Thermophilic Weaver Spider": "110110001220220002120120120",
    "Rule 154 Waxing Gibbous Thermophilic Tube Spider": "210210001210210002120120120",
    "Rule 154 Waxing Crescent Thermophilic Silk Spider": "120120001120120002120120120",
    "Rule 154 Full Moon Deep Water Sea Spider": "220210001210110002110220120",
    "Rule 154 New Moon Deep Water Silk Spider": "110120001120220002110220120",
    "Rule 154 Half Moon Deep Water Sac Spider": "220110001220110002110220120",
    "Rule 154 Waning Gibbous Deep Water Cheese Mite": "220220001110110002110220120",
    "Rule 154 Waning Crescent Deep Water Cellar Spider": "110110001220220002110220120",
    "Rule 154 Waxing Gibbous Deep Water Camel Spider": "210210001210210002110220120",
    "Rule 154 Waxing Crescent Deep Water Orb Weaver": "120120001120120002110220120",
    "Rule 154 Full Moon Swamp Lampshade Spider": "220210001210110002120210120",
    "Rule 154 New Moon Swamp Wind Spider": "110120001120220002120210120",
    "Rule 154 Half Moon Swamp Scorpion": "220110001220110002120210120",
    "Rule 154 Waning Gibbous Swamp Cheese Mite": "220220001110110002120210120",
    "Rule 154 Waning Crescent Swamp Pseudoscorpion": "110110001220220002120210120",
    "Rule 154 Waxing Gibbous Swamp Jumping Spider": "210210001210210002120210120",
    "Rule 154 Waxing Crescent Swamp Cheese Mite": "120120001120120002120210120",
    "Rule 154 Full Moon Cave Scorpion": "220210001210110002210120120",
    "Rule 154 New Moon Cave Jumping Spider": "110120001120220002210120120",
    "Rule 154 Half Moon Cave Ray Spider": "220110001220110002210120120",
    "Rule 154 Waning Gibbous Cave Endeostigmata": "220220001110110002210120120",
    "Rule 154 Waning Crescent Cave Weaver Spider": "110110001220220002210120120",
    "Rule 154 Waxing Gibbous Cave Sac Spider": "210210001210210002210120120",
    "Rule 154 Waxing Crescent Cave Funnel Spider": "120120001120120002210120120",
    "Rule 178 Full Moon Electric Frogmouth": "220210222210110111000000210",
    "Rule 178 New Moon Electric Trumpeter": "110120222120220111000000210",
    "Rule 178 Half Moon Electric Puffin": "220110222220110111000000210",
    "Rule 178 Waning Gibbous Electric Penguin": "220220222110110111000000210",
    "Rule 178 Waning Crescent Electric Turkey": "110110222220220111000000210",
    "Rule 178 Waxing Gibbous Electric Flamingo": "210210222210210111000000210",
    "Rule 178 Waxing Crescent Electric Martin": "120120222120120111000000210",
    "Rule 178 Full Moon Quantum Oriole": "220210212210110211000000210",
    "Rule 178 New Moon Quantum Oystercatcher": "110120212120220211000000210",
    "Rule 178 Half Moon Quantum Gosbeak": "220110212220110211000000210",
    "Rule 178 Waning Gibbous Quantum Flycatcher": "220220212110110211000000210",
    "Rule 178 Waning Crescent Quantum Osprey": "110110212220220211000000210",
    "Rule 178 Waxing Gibbous Quantum Lark": "210210212210210211000000210",
    "Rule 178 Waxing Crescent Quantum Harrier": "120120212120120211000000210",
    "Rule 178 Full Moon Thermophilic Gosbeak": "220210122210110121000000210",
    "Rule 178 New Moon Thermophilic Oriole": "110120122120220121000000210",
    "Rule 178 Half Moon Thermophilic Drongo": "220110122220110121000000210",
    "Rule 178 Waning Gibbous Thermophilic Hummingbird": "220220122110110121000000210",
    "Rule 178 Waning Crescent Thermophilic Broadbill": "110110122220220121000000210",
    "Rule 178 Waxing Gibbous Thermophilic Stitchbird": "210210122210210121000000210",
    "Rule 178 Waxing Crescent Thermophilic Woodpecker": "120120122120120121000000210",
    "Rule 178 Full Moon Deep Water Sheathbill": "220210112210110221000000210",
    "Rule 178 New Moon Deep Water Berrypecker": "110120112120220221000000210",
    "Rule 178 Half Moon Deep Water Pelican": "220110112220110221000000210",
    "Rule 178 Waning Gibbous Deep Water Nightjar": "220220112110110221000000210",
    "Rule 178 Waning Crescent Deep Water Woodpecker": "110110112220220221000000210",
    "Rule 178 Waxing Gibbous Deep Water Harrier": "210210112210210221000000210",
    "Rule 178 Waxing Crescent Deep Water Hummingbird": "120120112120120221000000210",
    "Rule 178 Full Moon Swamp Kingfisher": "220210122210110211000000210",
    "Rule 178 New Moon Swamp Trumpeter": "110120122120220211000000210",
    "Rule 178 Half Moon Swamp Sparrow": "220110122220110211000000210",
    "Rule 178 Waning Gibbous Swamp Shrike": "220220122110110211000000210",
    "Rule 178 Waning Crescent Swamp Hummingbird": "110110122220220211000000210",
    "Rule 178 Waxing Gibbous Swamp Boobie": "210210122210210211000000210",
    "Rule 178 Waxing Crescent Swamp Kiwi": "120120122120120211000000210",
    "Rule 178 Full Moon Cave Shoebills": "220210212210110121000000210",
    "Rule 178 New Moon Cave Longspur": "110120212120220121000000210",
    "Rule 178 Half Moon Cave Dove": "220110212220110121000000210",
    "Rule 178 Waning Gibbous Cave Longspur": "220220212110110121000000210",
    "Rule 178 Waning Crescent Cave Sparrow": "110110212220220121000000210",
    "Rule 178 Waxing Gibbous Cave Broadbill": "210210212210210121000000210",
    "Rule 178 Waxing Crescent Cave Blackbird": "120120212120120121000000210",
    "Rule 178 Full Moon Electric Cellar Spider": "220210221210110112000000120",
    "Rule 178 New Moon Electric Jumping Spider": "110120221120220112000000120",
    "Rule 178 Half Moon Electric Ray Spider": "220110221220110112000000120",
    "Rule 178 Waning Gibbous Electric Shepherd Spider": "220220221110110112000000120",
    "Rule 178 Waning Crescent Electric Camel Spider": "110110221220220112000000120",
    "Rule 178 Waxing Gibbous Electric Pseudoscorpion": "210210221210210112000000120",
    "Rule 178 Waxing Crescent Electric Sun scorpion": "120120221120120112000000120",
    "Rule 178 Full Moon Quantum Lampshade Spider": "220210211210110212000000120",
    "Rule 178 New Moon Quantum Redberry Mite": "110120211120220212000000120",
    "Rule 178 Half Moon Quantum Weaver Spider": "220110211220110212000000120",
    "Rule 178 Waning Gibbous Quantum Ground Spider": "220220211110110212000000120",
    "Rule 178 Waning Crescent Quantum Wind Spider": "110110211220220212000000120",
    "Rule 178 Waxing Gibbous Quantum Pseudoscorpion": "210210211210210212000000120",
    "Rule 178 Waxing Crescent Quantum Violin Spider": "120120211120120212000000120",
    "Rule 178 Full Moon Thermophilic Orb Weaver": "220210121210110122000000120",
    "Rule 178 New Moon Thermophilic Orb Weaver": "110120121120220122000000120",
    "Rule 178 Half Moon Thermophilic Pseudoscorpion": "220110121220110122000000120",
    "Rule 178 Waning Gibbous Thermophilic Sea Spider": "220220121110110122000000120",
    "Rule 178 Waning Crescent Thermophilic Wolf Spider": "110110121220220122000000120",
    "Rule 178 Waxing Gibbous Thermophilic Armor Spider": "210210121210210122000000120",
    "Rule 178 Waxing Crescent Thermophilic Jumping Spider": "120120121120120122000000120",
    "Rule 178 Full Moon Deep Water Tube Spider": "220210111210110222000000120",
    "Rule 178 New Moon Deep Water Weaver Spider": "110120111120220222000000120",
    "Rule 178 Half Moon Deep Water Mouse Spider": "220110111220110222000000120",
    "Rule 178 Waning Gibbous Deep Water Troglobite Spider": "220220111110110222000000120",
    "Rule 178 Waning Crescent Deep Water Pseudoscorpion": "110110111220220222000000120",
    "Rule 178 Waxing Gibbous Deep Water Troglobite Spider": "210210111210210222000000120",
    "Rule 178 Waxing Crescent Deep Water Endeostigmata": "120120111120120222000000120",
    "Rule 178 Full Moon Swamp Sun Spider": "220210121210110212000000120",
    "Rule 178 New Moon Swamp Mouse Spider": "110120121120220212000000120",
    "Rule 178 Half Moon Swamp Pseudoscorpion": "220110121220110212000000120",
    "Rule 178 Waning Gibbous Swamp Mite": "220220121110110212000000120",
    "Rule 178 Waning Crescent Swamp Sea Spider": "110110121220220212000000120",
    "Rule 178 Waxing Gibbous Swamp Pseudoscorpion": "210210121210210212000000120",
    "Rule 178 Waxing Crescent Swamp Armor Spider": "120120121120120212000000120",
    "Rule 178 Full Moon Cave Silk Spider": "220210211210110122000000120",
    "Rule 178 New Moon Cave Funnel Spider": "110120211120220122000000120",
    "Rule 178 Half Moon Cave Cellar Spider": "220110211220110122000000120",
    "Rule 178 Waning Gibbous Cave Ground Spider": "220220211110110122000000120",
    "Rule 178 Waning Crescent Cave Lampshade Spider": "110110211220220122000000120",
    "Rule 178 Waxing Gibbous Cave Silk Spider": "210210211210210122000000120",
    "Rule 178 Waxing Crescent Cave Violin Spider": "120120211120120122000000120",
    "Rule 198 Full Moon Electric Trumpeter": "222212000211111000002001210",
    "Rule 198 New Moon Electric Trumpeter": "112122000121221000002001210",
    "Rule 198 Half Moon Electric Gull": "222112000221111000002001210",
    "Rule 198 Waning Gibbous Electric Heron": "222222000111111000002001210",
    "Rule 198 Waning Crescent Electric Shoebills": "112112000221221000002001210",
    "Rule 198 Waxing Gibbous Electric Crow": "212212000211211000002001210",
    "Rule 198 Waxing Crescent Electric Gull": "122122000121121000002001210",
    "Rule 198 Full Moon Quantum Buzzard": "222211000212111000002001210",
    "Rule 198 New Moon Quantum Pelican": "112121000122221000002001210",
    "Rule 198 Half Moon Quantum Kite": "222111000222111000002001210",
    "Rule 198 Waning Gibbous Quantum Buzzard": "222221000112111000002001210",
    "Rule 198 Waning Crescent Quantum Egret": "112111000222221000002001210",
    "Rule 198 Waxing Gibbous Quantum Cardinal": "212211000212211000002001210",
    "Rule 198 Waxing Crescent Quantum Finch": "122121000122121000002001210",
    "Rule 198 Full Moon Thermophilic Shoebills": "221212000211112000002001210",
    "Rule 198 New Moon Thermophilic Shrike": "111122000121222000002001210",
    "Rule 198 Half Moon Thermophilic Trumpeter": "221112000221112000002001210",
    "Rule 198 Waning Gibbous Thermophilic Sheathbill": "221222000111112000002001210",
    "Rule 198 Waning Crescent Thermophilic Blackbird": "111112000221222000002001210",
    "Rule 198 Waxing Gibbous Thermophilic Turkey": "211212000211212000002001210",
    "Rule 198 Waxing Crescent Thermophilic Toucan": "121122000121122000002001210",
    "Rule 198 Full Moon Deep Water Harrier": "221211000212112000002001210",
    "Rule 198 New Moon Deep Water Penguin": "111121000122222000002001210",
    "Rule 198 Half Moon Deep Water Hummingbird": "221111000222112000002001210",
    "Rule 198 Waning Gibbous Deep Water Skimmer": "221221000112112000002001210",
    "Rule 198 Waning Crescent Deep Water Drongo": "111111000222222000002001210",
    "Rule 198 Waxing Gibbous Deep Water Osprey": "211211000212212000002001210",
    "Rule 198 Waxing Crescent Deep Water Vulture": "121121000122122000002001210",
    "Rule 198 Full Moon Swamp Osprey": "221212000212111000002001210",
    "Rule 198 New Moon Swamp Longspur": "111122000122221000002001210",
    "Rule 198 Half Moon Swamp Thrush": "221112000222111000002001210",
    "Rule 198 Waning Gibbous Swamp Shrike": "221222000112111000002001210",
    "Rule 198 Waning Crescent Swamp Cockatoo": "111112000222221000002001210",
    "Rule 198 Waxing Gibbous Swamp Cukoo": "211212000212211000002001210",
    "Rule 198 Waxing Crescent Swamp Puffin": "121122000122121000002001210",
    "Rule 198 Full Moon Cave Lark": "222211000211112000002001210",
    "Rule 198 New Moon Cave Cardinal": "112121000121222000002001210",
    "Rule 198 Half Moon Cave Frogmouth": "222111000221112000002001210",
    "Rule 198 Waning Gibbous Cave Thrush": "222221000111112000002001210",
    "Rule 198 Waning Crescent Cave Woodpecker": "112111000221222000002001210",
    "Rule 198 Waxing Gibbous Cave Parrot": "212211000211212000002001210",
    "Rule 198 Waxing Crescent Cave Hornbill": "122121000121122000002001210",
    "Rule 198 Full Moon Electric Sac Spider": "222212000211111000001002120",
    "Rule 198 New Moon Electric Tube Spider": "112122000121221000001002120",
    "Rule 198 Half Moon Electric Tube Spider": "222112000221111000001002120",
    "Rule 198 Waning Gibbous Electric Armor Spider": "222222000111111000001002120",
    "Rule 198 Waning Crescent Electric Tube Spider": "112112000221221000001002120",
    "Rule 198 Waxing Gibbous Electric Lampshade Spider": "212212000211211000001002120",
    "Rule 198 Waxing Crescent Electric Scorpion": "122122000121121000001002120",
    "Rule 198 Full Moon Quantum Camel Spider": "222211000212111000001002120",
    "Rule 198 New Moon Quantum Spider Mite": "112121000122221000001002120",
    "Rule 198 Half Moon Quantum Weaver Spider": "222111000222111000001002120",
    "Rule 198 Waning Gibbous Quantum Jumping Spider": "222221000112111000001002120",
    "Rule 198 Waning Crescent Quantum Sac Spider": "112111000222221000001002120",
    "Rule 198 Waxing Gibbous Quantum Mite": "212211000212211000001002120",
    "Rule 198 Waxing Crescent Quantum Cheese Mite": "122121000122121000001002120",
    "Rule 198 Full Moon Thermophilic Scorpion": "221212000211112000001002120",
    "Rule 198 New Moon Thermophilic Orb Weaver": "111122000121222000001002120",
    "Rule 198 Half Moon Thermophilic Sea Spider": "221112000221112000001002120",
    "Rule 198 Waning Gibbous Thermophilic Sun scorpion": "221222000111112000001002120",
    "Rule 198 Waning Crescent Thermophilic Orb Weaver": "111112000221222000001002120",
    "Rule 198 Waxing Gibbous Thermophilic Funnel Spider": "211212000211212000001002120",
    "Rule 198 Waxing Crescent Thermophilic Armor Spider": "121122000121122000001002120",
    "Rule 198 Full Moon Deep Water Silk Spider": "221211000212112000001002120",
    "Rule 198 New Moon Deep Water Armor Spider": "111121000122222000001002120",
    "Rule 198 Half Moon Deep Water Spider Mite": "221111000222112000001002120",
    "Rule 198 Waning Gibbous Deep Water Cheese Mite": "221221000112112000001002120",
    "Rule 198 Waning Crescent Deep Water Tube Spider": "111111000222222000001002120",
    "Rule 198 Waxing Gibbous Deep Water Shepherd Spider": "211211000212212000001002120",
    "Rule 198 Waxing Crescent Deep Water Camel Spider": "121121000122122000001002120",
    "Rule 198 Full Moon Swamp Sun scorpion": "221212000212111000001002120",
    "Rule 198 New Moon Swamp Redberry Mite": "111122000122221000001002120",
    "Rule 198 Half Moon Swamp Camel Spider": "221112000222111000001002120",
    "Rule 198 Waning Gibbous Swamp Vampire Spider": "221222000112111000001002120",
    "Rule 198 Waning Crescent Swamp Tarantula": "111112000222221000001002120",
    "Rule 198 Waxing Gibbous Swamp Shepherd Spider": "211212000212211000001002120",
    "Rule 198 Waxing Crescent Swamp Armor Spider": "121122000122121000001002120",
    "Rule 198 Full Moon Cave Lampshade Spider": "222211000211112000001002120",
    "Rule 198 New Moon Cave Ground Spider": "112121000121222000001002120",
    "Rule 198 Half Moon Cave Vampire Spider": "222111000221112000001002120",
    "Rule 198 Waning Gibbous Cave Tube Spider": "222221000111112000001002120",
    "Rule 198 Waning Crescent Cave Camel Spider": "112111000221222000001002120",
    "Rule 198 Waxing Gibbous Cave Violin Spider": "212211000211212000001002120",
    "Rule 198 Waxing Crescent Cave Sun scorpion": "122121000121122000001002120",
    "Rule 182 Full Moon Electric Flamingo": "220210222210110111002001210",
    "Rule 182 New Moon Electric Kingfisher": "110120222120220111002001210",
    "Rule 182 Half Moon Electric Ploughbill": "220110222220110111002001210",
    "Rule 182 Waning Gibbous Electric Thrush": "220220222110110111002001210",
    "Rule 182 Waning Crescent Electric Warbler": "110110222220220111002001210",
    "Rule 182 Waxing Gibbous Electric Skimmer": "210210222210210111002001210",
    "Rule 182 Waxing Crescent Electric Waterfowl": "120120222120120111002001210",
    "Rule 182 Full Moon Quantum Kite": "220210212210110211002001210",
    "Rule 182 New Moon Quantum Broadbill": "110120212120220211002001210",
    "Rule 182 Half Moon Quantum Flycatcher": "220110212220110211002001210",
    "Rule 182 Waning Gibbous Quantum Nightjar": "220220212110110211002001210",
    "Rule 182 Waning Crescent Quantum Owl": "110110212220220211002001210",
    "Rule 182 Waxing Gibbous Quantum Osprey": "210210212210210211002001210",
    "Rule 182 Waxing Crescent Quantum Vanga": "120120212120120211002001210",
    "Rule 182 Full Moon Thermophilic Shrike": "220210122210110121002001210",
    "Rule 182 New Moon Thermophilic Babbler": "110120122120220121002001210",
    "Rule 182 Half Moon Thermophilic Falcon": "220110122220110121002001210",
    "Rule 182 Waning Gibbous Thermophilic Nightjar": "220220122110110121002001210",
    "Rule 182 Waning Crescent Thermophilic Sheathbill": "110110122220220121002001210",
    "Rule 182 Waxing Gibbous Thermophilic Hummingbird": "210210122210210121002001210",
    "Rule 182 Waxing Crescent Thermophilic Eagle": "120120122120120121002001210",
    "Rule 182 Full Moon Deep Water Oriole": "220210112210110221002001210",
    "Rule 182 New Moon Deep Water Sheathbill": "110120112120220221002001210",
    "Rule 182 Half Moon Deep Water Finch": "220110112220110221002001210",
    "Rule 182 Waning Gibbous Deep Water Blackbird": "220220112110110221002001210",
    "Rule 182 Waning Crescent Deep Water Buttonquail": "110110112220220221002001210",
    "Rule 182 Waxing Gibbous Deep Water Flycatcher": "210210112210210221002001210",
    "Rule 182 Waxing Crescent Deep Water Flamingo": "120120112120120221002001210",
    "Rule 182 Full Moon Swamp Bristlehead": "220210122210110211002001210",
    "Rule 182 New Moon Swamp Parrot": "110120122120220211002001210",
    "Rule 182 Half Moon Swamp Penguin": "220110122220110211002001210",
    "Rule 182 Waning Gibbous Swamp Mousebird": "220220122110110211002001210",
    "Rule 182 Waning Crescent Swamp Thrush": "110110122220220211002001210",
    "Rule 182 Waxing Gibbous Swamp Skimmer": "210210122210210211002001210",
    "Rule 182 Waxing Crescent Swamp Stitchbird": "120120122120120211002001210",
    "Rule 182 Full Moon Cave Wagtail": "220210212210110121002001210",
    "Rule 182 New Moon Cave Dove": "110120212120220121002001210",
    "Rule 182 Half Moon Cave Kingfisher": "220110212220110121002001210",
    "Rule 182 Waning Gibbous Cave Blackbird": "220220212110110121002001210",
    "Rule 182 Waning Crescent Cave Puffin": "110110212220220121002001210",
    "Rule 182 Waxing Gibbous Cave Toucan": "210210212210210121002001210",
    "Rule 182 Waxing Crescent Cave Dove": "120120212120120121002001210",
    "Rule 182 Full Moon Electric Mouse Spider": "220210221210110112001002120",
    "Rule 182 New Moon Electric Sun scorpion": "110120221120220112001002120",
    "Rule 182 Half Moon Electric Camel Spider": "220110221220110112001002120",
    "Rule 182 Waning Gibbous Electric Orb Weaver": "220220221110110112001002120",
    "Rule 182 Waning Crescent Electric Sun Spider": "110110221220220112001002120",
    "Rule 182 Waxing Gibbous Electric Sac Spider": "210210221210210112001002120",
    "Rule 182 Waxing Crescent Electric Ground Spider": "120120221120120112001002120",
    "Rule 182 Full Moon Quantum Scorpion": "220210211210110212001002120",
    "Rule 182 New Moon Quantum Sun Spider": "110120211120220212001002120",
    "Rule 182 Half Moon Quantum Sun Spider": "220110211220110212001002120",
    "Rule 182 Waning Gibbous Quantum Lampshade Spider": "220220211110110212001002120",
    "Rule 182 Waning Crescent Quantum Tube Spider": "110110211220220212001002120",
    "Rule 182 Waxing Gibbous Quantum Jumping Spider": "210210211210210212001002120",
    "Rule 182 Waxing Crescent Quantum Jumping Spider": "120120211120120212001002120",
    "Rule 182 Full Moon Thermophilic Spider Mite": "220210121210110122001002120",
    "Rule 182 New Moon Thermophilic Camel Spider": "110120121120220122001002120",
    "Rule 182 Half Moon Thermophilic Claw Spider": "220110121220110122001002120",
    "Rule 182 Waning Gibbous Thermophilic Tube Spider": "220220121110110122001002120",
    "Rule 182 Waning Crescent Thermophilic Lampshade Spider": "110110121220220122001002120",
    "Rule 182 Waxing Gibbous Thermophilic Wind Spider": "210210121210210122001002120",
    "Rule 182 Waxing Crescent Thermophilic Shepherd Spider": "120120121120120122001002120",
    "Rule 182 Full Moon Deep Water Cheese Mite": "220210111210110222001002120",
    "Rule 182 New Moon Deep Water Wolf Spider": "110120111120220222001002120",
    "Rule 182 Half Moon Deep Water Armor Spider": "220110111220110222001002120",
    "Rule 182 Waning Gibbous Deep Water Claw Spider": "220220111110110222001002120",
    "Rule 182 Waning Crescent Deep Water Lampshade Spider": "110110111220220222001002120",
    "Rule 182 Waxing Gibbous Deep Water Orb Weaver": "210210111210210222001002120",
    "Rule 182 Waxing Crescent Deep Water Sea Spider": "120120111120120222001002120",
    "Rule 182 Full Moon Swamp Cheese Mite": "220210121210110212001002120",
    "Rule 182 New Moon Swamp Silk Spider": "110120121120220212001002120",
    "Rule 182 Half Moon Swamp Ground Spider": "220110121220110212001002120",
    "Rule 182 Waning Gibbous Swamp Tarantula": "220220121110110212001002120",
    "Rule 182 Waning Crescent Swamp Spider Mite": "110110121220220212001002120",
    "Rule 182 Waxing Gibbous Swamp Troglobite Spider": "210210121210210212001002120",
    "Rule 182 Waxing Crescent Swamp Cellar Spider": "120120121120120212001002120",
    "Rule 182 Full Moon Cave Orb Weaver": "220210211210110122001002120",
    "Rule 182 New Moon Cave Claw Spider": "110120211120220122001002120",
    "Rule 182 Half Moon Cave Tarantula": "220110211220110122001002120",
    "Rule 182 Waning Gibbous Cave Pseudoscorpion": "220220211110110122001002120",
    "Rule 182 Waning Crescent Cave Sac Spider": "110110211220220122001002120",
    "Rule 182 Waxing Gibbous Cave Tarantula": "210210211210210122001002120",
    "Rule 182 Waxing Crescent Cave Lampshade Spider": "120120211120120122001002120",
    "Rule 210 Full Moon Electric Vulture": "222212002211111001000000210",
    "Rule 210 New Moon Electric Magpie": "112122002121221001000000210",
    "Rule 210 Half Moon Electric Cukoo": "222112002221111001000000210",
    "Rule 210 Waning Gibbous Electric Sandgrouse": "222222002111111001000000210",
    "Rule 210 Waning Crescent Electric Eagle": "112112002221221001000000210",
    "Rule 210 Waxing Gibbous Electric Crane": "212212002211211001000000210",
    "Rule 210 Waxing Crescent Electric Moa": "122122002121121001000000210",
    "Rule 210 Full Moon Quantum Buttonquail": "222211002212111001000000210",
    "Rule 210 New Moon Quantum Vulture": "112121002122221001000000210",
    "Rule 210 Half Moon Quantum Oystercatcher": "222111002222111001000000210",
    "Rule 210 Waning Gibbous Quantum Broadbill": "222221002112111001000000210",
    "Rule 210 Waning Crescent Quantum Longspur": "112111002222221001000000210",
    "Rule 210 Waxing Gibbous Quantum Loon": "212211002212211001000000210",
    "Rule 210 Waxing Crescent Quantum Finch": "122121002122121001000000210",
    "Rule 210 Full Moon Thermophilic Babbler": "221212002211112001000000210",
    "Rule 210 New Moon Thermophilic Flamingo": "111122002121222001000000210",
    "Rule 210 Half Moon Thermophilic Cockatoo": "221112002221112001000000210",
    "Rule 210 Waning Gibbous Thermophilic Skimmer": "221222002111112001000000210",
    "Rule 210 Waning Crescent Thermophilic Boobie": "111112002221222001000000210",
    "Rule 210 Waxing Gibbous Thermophilic Stitchbird": "211212002211212001000000210",
    "Rule 210 Waxing Crescent Thermophilic Boobie": "121122002121122001000000210",
    "Rule 210 Full Moon Deep Water Cukoo": "221211002212112001000000210",
    "Rule 210 New Moon Deep Water Woodpecker": "111121002122222001000000210",
    "Rule 210 Half Moon Deep Water Kite": "221111002222112001000000210",
    "Rule 210 Waning Gibbous Deep Water Fantail": "221221002112112001000000210",
    "Rule 210 Waning Crescent Deep Water Pelican": "111111002222222001000000210",
    "Rule 210 Waxing Gibbous Deep Water Harrier": "211211002212212001000000210",
    "Rule 210 Waxing Crescent Deep Water Osprey": "121121002122122001000000210",
    "Rule 210 Full Moon Swamp Puffin": "221212002212111001000000210",
    "Rule 210 New Moon Swamp Hummingbird": "111122002122221001000000210",
    "Rule 210 Half Moon Swamp Nightjar": "221112002222111001000000210",
    "Rule 210 Waning Gibbous Swamp Turkey": "221222002112111001000000210",
    "Rule 210 Waning Crescent Swamp Penguin": "111112002222221001000000210",
    "Rule 210 Waxing Gibbous Swamp Oystercatcher": "211212002212211001000000210",
    "Rule 210 Waxing Crescent Swamp Loon": "121122002122121001000000210",
    "Rule 210 Full Moon Cave Falcon": "222211002211112001000000210",
    "Rule 210 New Moon Cave Owl": "112121002121222001000000210",
    "Rule 210 Half Moon Cave Frogmouth": "222111002221112001000000210",
    "Rule 210 Waning Gibbous Cave Vanga": "222221002111112001000000210",
    "Rule 210 Waning Crescent Cave Jay": "112111002221222001000000210",
    "Rule 210 Waxing Gibbous Cave Cardinal": "212211002211212001000000210",
    "Rule 210 Waxing Crescent Cave Vulture": "122121002121122001000000210",
    "Rule 210 Full Moon Electric Cheese Mite": "222212001211111002000000120",
    "Rule 210 New Moon Electric Vampire Spider": "112122001121221002000000120",
    "Rule 210 Half Moon Electric Redberry Mite": "222112001221111002000000120",
    "Rule 210 Waning Gibbous Electric Tick": "222222001111111002000000120",
    "Rule 210 Waning Crescent Electric Endeostigmata": "112112001221221002000000120",
    "Rule 210 Waxing Gibbous Electric Cellar Spider": "212212001211211002000000120",
    "Rule 210 Waxing Crescent Electric Weaver Spider": "122122001121121002000000120",
    "Rule 210 Full Moon Quantum Violin Spider": "222211001212111002000000120",
    "Rule 210 New Moon Quantum Armor Spider": "112121001122221002000000120",
    "Rule 210 Half Moon Quantum Shepherd Spider": "222111001222111002000000120",
    "Rule 210 Waning Gibbous Quantum Cheese Mite": "222221001112111002000000120",
    "Rule 210 Waning Crescent Quantum Claw Spider": "112111001222221002000000120",
    "Rule 210 Waxing Gibbous Quantum Weaver Spider": "212211001212211002000000120",
    "Rule 210 Waxing Crescent Quantum Funnel Spider": "122121001122121002000000120",
    "Rule 210 Full Moon Thermophilic Ground Spider": "221212001211112002000000120",
    "Rule 210 New Moon Thermophilic Pseudoscorpion": "111122001121222002000000120",
    "Rule 210 Half Moon Thermophilic Sea Spider": "221112001221112002000000120",
    "Rule 210 Waning Gibbous Thermophilic Sun scorpion": "221222001111112002000000120",
    "Rule 210 Waning Crescent Thermophilic Spider Mite": "111112001221222002000000120",
    "Rule 210 Waxing Gibbous Thermophilic Orb Weaver": "211212001211212002000000120",
    "Rule 210 Waxing Crescent Thermophilic Sun scorpion": "121122001121122002000000120",
    "Rule 210 Full Moon Deep Water Armor Spider": "221211001212112002000000120",
    "Rule 210 New Moon Deep Water Tarantula": "111121001122222002000000120",
    "Rule 210 Half Moon Deep Water Camel Spider": "221111001222112002000000120",
    "Rule 210 Waning Gibbous Deep Water Claw Spider": "221221001112112002000000120",
    "Rule 210 Waning Crescent Deep Water Silk Spider": "111111001222222002000000120",
    "Rule 210 Waxing Gibbous Deep Water Sac Spider": "211211001212212002000000120",
    "Rule 210 Waxing Crescent Deep Water Wind Spider": "121121001122122002000000120",
    "Rule 210 Full Moon Swamp Woodlouse Spider": "221212001212111002000000120",
    "Rule 210 New Moon Swamp Cheese Mite": "111122001122221002000000120",
    "Rule 210 Half Moon Swamp Jumping Spider": "221112001222111002000000120",
    "Rule 210 Waning Gibbous Swamp Spider Mite": "221222001112111002000000120",
    "Rule 210 Waning Crescent Swamp Scorpion": "111112001222221002000000120",
    "Rule 210 Waxing Gibbous Swamp Endeostigmata": "211212001212211002000000120",
    "Rule 210 Waxing Crescent Swamp Cellar Spider": "121122001122121002000000120",
    "Rule 210 Full Moon Cave Mite": "222211001211112002000000120",
    "Rule 210 New Moon Cave Troglobite Spider": "112121001121222002000000120",
    "Rule 210 Half Moon Cave Camel Spider": "222111001221112002000000120",
    "Rule 210 Waning Gibbous Cave Redberry Mite": "222221001111112002000000120",
    "Rule 210 Waning Crescent Cave Claw Spider": "112111001221222002000000120",
    "Rule 210 Waxing Gibbous Cave Sun scorpion": "212211001211212002000000120",
    "Rule 210 Waxing Crescent Cave Vampire Spider": "122121001121122002000000120",
    "Rule 214 Full Moon Electric Eagle": "222212002211111001002001210",
    "Rule 214 New Moon Electric Cukoo": "112122002121221001002001210",
    "Rule 214 Half Moon Electric Stitchbird": "222112002221111001002001210",
    "Rule 214 Waning Gibbous Electric Pigeon": "222222002111111001002001210",
    "Rule 214 Waning Crescent Electric Kite": "112112002221221001002001210",
    "Rule 214 Waxing Gibbous Electric Turkey": "212212002211211001002001210",
    "Rule 214 Waxing Crescent Electric Pigeon": "122122002121121001002001210",
    "Rule 214 Full Moon Quantum Stitchbird": "222211002212111001002001210",
    "Rule 214 New Moon Quantum Drongo": "112121002122221001002001210",
    "Rule 214 Half Moon Quantum Drongo": "222111002222111001002001210",
    "Rule 214 Waning Gibbous Quantum Woodpecker": "222221002112111001002001210",
    "Rule 214 Waning Crescent Quantum Skimmer": "112111002222221001002001210",
    "Rule 214 Waxing Gibbous Quantum Oriole": "212211002212211001002001210",
    "Rule 214 Waxing Crescent Quantum Vulture": "122121002122121001002001210",
    "Rule 214 Full Moon Thermophilic Drongo": "221212002211112001002001210",
    "Rule 214 New Moon Thermophilic Buzzard": "111122002121222001002001210",
    "Rule 214 Half Moon Thermophilic Parrot": "221112002221112001002001210",
    "Rule 214 Waning Gibbous Thermophilic Mousebird": "221222002111112001002001210",
    "Rule 214 Waning Crescent Thermophilic Dove": "111112002221222001002001210",
    "Rule 214 Waxing Gibbous Thermophilic Falcon": "211212002211212001002001210",
    "Rule 214 Waxing Crescent Thermophilic Loon": "121122002121122001002001210",
    "Rule 214 Full Moon Deep Water Wagtail": "221211002212112001002001210",
    "Rule 214 New Moon Deep Water Skimmer": "111121002122222001002001210",
    "Rule 214 Half Moon Deep Water Parrot": "221111002222112001002001210",
    "Rule 214 Waning Gibbous Deep Water Sheathbill": "221221002112112001002001210",
    "Rule 214 Waning Crescent Deep Water Berrypecker": "111111002222222001002001210",
    "Rule 214 Waxing Gibbous Deep Water Parrot": "211211002212212001002001210",
    "Rule 214 Waxing Crescent Deep Water Moa": "121121002122122001002001210",
    "Rule 214 Full Moon Swamp Kiwi": "221212002212111001002001210",
    "Rule 214 New Moon Swamp Puffin": "111122002122221001002001210",
    "Rule 214 Half Moon Swamp Puffin": "221112002222111001002001210",
    "Rule 214 Waning Gibbous Swamp Vulture": "221222002112111001002001210",
    "Rule 214 Waning Crescent Swamp Wattlebird": "111112002222221001002001210",
    "Rule 214 Waxing Gibbous Swamp Mousebird": "211212002212211001002001210",
    "Rule 214 Waxing Crescent Swamp Eagle": "121122002122121001002001210",
    "Rule 214 Full Moon Cave Osprey": "222211002211112001002001210",
    "Rule 214 New Moon Cave Turkey": "112121002121222001002001210",
    "Rule 214 Half Moon Cave Loon": "222111002221112001002001210",
    "Rule 214 Waning Gibbous Cave Falcon": "222221002111112001002001210",
    "Rule 214 Waning Crescent Cave Pelican": "112111002221222001002001210",
    "Rule 214 Waxing Gibbous Cave Blackbird": "212211002211212001002001210",
    "Rule 214 Waxing Crescent Cave Blackbird": "122121002121122001002001210",
    "Rule 214 Full Moon Electric Armor Spider": "222212001211111002001002120",
    "Rule 214 New Moon Electric Termite Hunter": "112122001121221002001002120",
    "Rule 214 Half Moon Electric Vampire Spider": "222112001221111002001002120",
    "Rule 214 Waning Gibbous Electric Tarantula": "222222001111111002001002120",
    "Rule 214 Waning Crescent Electric Shepherd Spider": "112112001221221002001002120",
    "Rule 214 Waxing Gibbous Electric Tube Spider": "212212001211211002001002120",
    "Rule 214 Waxing Crescent Electric Tick": "122122001121121002001002120",
    "Rule 214 Full Moon Quantum Camel Spider": "222211001212111002001002120",
    "Rule 214 New Moon Quantum Endeostigmata": "112121001122221002001002120",
    "Rule 214 Half Moon Quantum Ray Spider": "222111001222111002001002120",
    "Rule 214 Waning Gibbous Quantum Silk Spider": "222221001112111002001002120",
    "Rule 214 Waning Crescent Quantum Cellar Spider": "112111001222221002001002120",
    "Rule 214 Waxing Gibbous Quantum Jumping Spider": "212211001212211002001002120",
    "Rule 214 Waxing Crescent Quantum Mite": "122121001122121002001002120",
    "Rule 214 Full Moon Thermophilic Lampshade Spider": "221212001211112002001002120",
    "Rule 214 New Moon Thermophilic Wind Spider": "111122001121222002001002120",
    "Rule 214 Half Moon Thermophilic Shepherd Spider": "221112001221112002001002120",
    "Rule 214 Waning Gibbous Thermophilic Armor Spider": "221222001111112002001002120",
    "Rule 214 Waning Crescent Thermophilic Tube Spider": "111112001221222002001002120",
    "Rule 214 Waxing Gibbous Thermophilic Funnel Spider": "211212001211212002001002120",
    "Rule 214 Waxing Crescent Thermophilic Armor Spider": "121122001121122002001002120",
    "Rule 214 Full Moon Deep Water Vampire Spider": "221211001212112002001002120",
    "Rule 214 New Moon Deep Water Cellar Spider": "111121001122222002001002120",
    "Rule 214 Half Moon Deep Water Mouse Spider": "221111001222112002001002120",
    "Rule 214 Waning Gibbous Deep Water Sun Spider": "221221001112112002001002120",
    "Rule 214 Waning Crescent Deep Water Tube Spider": "111111001222222002001002120",
    "Rule 214 Waxing Gibbous Deep Water Wolf Spider": "211211001212212002001002120",
    "Rule 214 Waxing Crescent Deep Water Troglobite Spider": "121121001122122002001002120",
    "Rule 214 Full Moon Swamp Cellar Spider": "221212001212111002001002120",
    "Rule 214 New Moon Swamp Camel Spider": "111122001122221002001002120",
    "Rule 214 Half Moon Swamp Mite": "221112001222111002001002120",
    "Rule 214 Waning Gibbous Swamp Armor Spider": "221222001112111002001002120",
    "Rule 214 Waning Crescent Swamp Weaver Spider": "111112001222221002001002120",
    "Rule 214 Waxing Gibbous Swamp Vampire Spider": "211212001212211002001002120",
    "Rule 214 Waxing Crescent Swamp Termite Hunter": "121122001122121002001002120",
    "Rule 214 Full Moon Cave Mite": "222211001211112002001002120",
    "Rule 214 New Moon Cave Wind Spider": "112121001121222002001002120",
    "Rule 214 Half Moon Cave Wolf Spider": "222111001221112002001002120",
    "Rule 214 Waning Gibbous Cave Camel Spider": "222221001111112002001002120",
    "Rule 214 Waning Crescent Cave Weaver Spider": "112111001221222002001002120",
    "Rule 214 Waxing Gibbous Cave Tarantula": "212211001211212002001002120",
    "Rule 214 Waxing Crescent Cave Redberry Mite": "122121001121122002001002120",
    "Rule 218 Full Moon Electric Osprey": "222212002211111001220110210",
    "Rule 218 New Moon Electric Shoebills": "112122002121221001220110210",
    "Rule 218 Half Moon Electric Turkey": "222112002221111001220110210",
    "Rule 218 Waning Gibbous Electric Berrypecker": "222222002111111001220110210",
    "Rule 218 Waning Crescent Electric Stork": "112112002221221001220110210",
    "Rule 218 Waxing Gibbous Electric Wattlebird": "212212002211211001220110210",
    "Rule 218 Waxing Crescent Electric Bristlehead": "122122002121121001220110210",
    "Rule 218 Full Moon Quantum Cockatoo": "222211002212111001210210210",
    "Rule 218 New Moon Quantum Flamingo": "112121002122221001210210210",
    "Rule 218 Half Moon Quantum Shoebills": "222111002222111001210210210",
    "Rule 218 Waning Gibbous Quantum Kite": "222221002112111001210210210",
    "Rule 218 Waning Crescent Quantum Kiwi": "112111002222221001210210210",
    "Rule 218 Waxing Gibbous Quantum Nightjar": "212211002212211001210210210",
    "Rule 218 Waxing Crescent Quantum Stitchbird": "122121002122121001210210210",
    "Rule 218 Full Moon Thermophilic Stitchbird": "221212002211112001120120210",
    "Rule 218 New Moon Thermophilic Kite": "111122002121222001120120210",
    "Rule 218 Half Moon Thermophilic Cardinal": "221112002221112001120120210",
    "Rule 218 Waning Gibbous Thermophilic Buzzard": "221222002111112001120120210",
    "Rule 218 Waning Crescent Thermophilic Falcon": "111112002221222001120120210",
    "Rule 218 Waxing Gibbous Thermophilic Pigeon": "211212002211212001120120210",
    "Rule 218 Waxing Crescent Thermophilic Blackbird": "121122002121122001120120210",
    "Rule 218 Full Moon Deep Water Hornbill": "221211002212112001110220210",
    "Rule 218 New Moon Deep Water Buttonquail": "111121002122222001110220210",
    "Rule 218 Half Moon Deep Water Shoebills": "221111002222112001110220210",
    "Rule 218 Waning Gibbous Deep Water Babbler": "221221002112112001110220210",
    "Rule 218 Waning Crescent Deep Water Skimmer": "111111002222222001110220210",
    "Rule 218 Waxing Gibbous Deep Water Puffin": "211211002212212001110220210",
    "Rule 218 Waxing Crescent Deep Water Kiwi": "121121002122122001110220210",
    "Rule 218 Full Moon Swamp Shoebills": "221212002212111001120210210",
    "Rule 218 New Moon Swamp Hornbill": "111122002122221001120210210",
    "Rule 218 Half Moon Swamp Egret": "221112002222111001120210210",
    "Rule 218 Waning Gibbous Swamp Warbler": "221222002112111001120210210",
    "Rule 218 Waning Crescent Swamp Mousebird": "111112002222221001120210210",
    "Rule 218 Waxing Gibbous Swamp Gosbeak": "211212002212211001120210210",
    "Rule 218 Waxing Crescent Swamp Vulture": "121122002122121001120210210",
    "Rule 218 Full Moon Cave Oriole": "222211002211112001210120210",
    "Rule 218 New Moon Cave Mousebird": "112121002121222001210120210",
    "Rule 218 Half Moon Cave Falcon": "222111002221112001210120210",
    "Rule 218 Waning Gibbous Cave Skimmer": "222221002111112001210120210",
    "Rule 218 Waning Crescent Cave Falcon": "112111002221222001210120210",
    "Rule 218 Waxing Gibbous Cave Finch": "212211002211212001210120210",
    "Rule 218 Waxing Crescent Cave Skimmer": "122121002121122001210120210",
    "Rule 218 Full Moon Electric Lampshade Spider": "222212001211111002220110120",
    "Rule 218 New Moon Electric Ray Spider": "112122001121221002220110120",
    "Rule 218 Half Moon Electric Silk Spider": "222112001221111002220110120",
    "Rule 218 Waning Gibbous Electric Shepherd Spider": "222222001111111002220110120",
    "Rule 218 Waning Crescent Electric Vampire Spider": "112112001221221002220110120",
    "Rule 218 Waxing Gibbous Electric Shepherd Spider": "212212001211211002220110120",
    "Rule 218 Waxing Crescent Electric Wolf Spider": "122122001121121002220110120",
    "Rule 218 Full Moon Quantum Wind Spider": "222211001212111002210210120",
    "Rule 218 New Moon Quantum Mouse Spider": "112121001122221002210210120",
    "Rule 218 Half Moon Quantum Ground Spider": "222111001222111002210210120",
    "Rule 218 Waning Gibbous Quantum Redberry Mite": "222221001112111002210210120",
    "Rule 218 Waning Crescent Quantum Shepherd Spider": "112111001222221002210210120",
    "Rule 218 Waxing Gibbous Quantum Troglobite Spider": "212211001212211002210210120",
    "Rule 218 Waxing Crescent Quantum Sun scorpion": "122121001122121002210210120",
    "Rule 218 Full Moon Thermophilic Wind Spider": "221212001211112002120120120",
    "Rule 218 New Moon Thermophilic Ground Spider": "111122001121222002120120120",
    "Rule 218 Half Moon Thermophilic Woodlouse Spider": "221112001221112002120120120",
    "Rule 218 Waning Gibbous Thermophilic Shepherd Spider": "221222001111112002120120120",
    "Rule 218 Waning Crescent Thermophilic Sac Spider": "111112001221222002120120120",
    "Rule 218 Waxing Gibbous Thermophilic Camel Spider": "211212001211212002120120120",
    "Rule 218 Waxing Crescent Thermophilic Silk Spider": "121122001121122002120120120",
    "Rule 218 Full Moon Deep Water Wind Spider": "221211001212112002110220120",
    "Rule 218 New Moon Deep Water Wolf Spider": "111121001122222002110220120",
    "Rule 218 Half Moon Deep Water Sun Spider": "221111001222112002110220120",
    "Rule 218 Waning Gibbous Deep Water Camel Spider": "221221001112112002110220120",
    "Rule 218 Waning Crescent Deep Water Spider Mite": "111111001222222002110220120",
    "Rule 218 Waxing Gibbous Deep Water Weaver Spider": "211211001212212002110220120",
    "Rule 218 Waxing Crescent Deep Water Woodlouse Spider": "121121001122122002110220120",
    "Rule 218 Full Moon Swamp Cheese Mite": "221212001212111002120210120",
    "Rule 218 New Moon Swamp Tick": "111122001122221002120210120",
    "Rule 218 Half Moon Swamp Sea Spider": "221112001222111002120210120",
    "Rule 218 Waning Gibbous Swamp Mouse Spider": "221222001112111002120210120",
    "Rule 218 Waning Crescent Swamp Silk Spider": "111112001222221002120210120",
    "Rule 218 Waxing Gibbous Swamp Camel Spider": "211212001212211002120210120",
    "Rule 218 Waxing Crescent Swamp Mouse Spider": "121122001122121002120210120",
    "Rule 218 Full Moon Cave Woodlouse Spider": "222211001211112002210120120",
    "Rule 218 New Moon Cave Cellar Spider": "112121001121222002210120120",
    "Rule 218 Half Moon Cave Jumping Spider": "222111001221112002210120120",
    "Rule 218 Waning Gibbous Cave Orb Weaver": "222221001111112002210120120",
    "Rule 218 Waning Crescent Cave Wind Spider": "112111001221222002210120120",
    "Rule 218 Waxing Gibbous Cave Ground Spider": "212211001211212002210120120",
    "Rule 218 Waxing Crescent Cave Woodlouse Spider": "122121001121122002210120120"
  };

  var ruleNamesArr = Object.keys(ruleNames);
  var randomIndex = Math.floor(Math.random()*ruleNamesArr.length);

  var randomRuleName = ruleNamesArr[randomIndex];
  var randomRuleString = ruleNames[randomRuleName];

  var GOL = {

    baseApiUrl : getBaseApiUrl(),
    baseUIUrl : getBaseUIUrl(),
    mapsApiUrl : getMapsApiUrl(),

    // this may duplicate / between the base url and simulator
    baseSimulatorUrl : getBaseUIUrl() + '/simulator/index.html',

    s1Default: '[{"0":[8,10,18,19,25,38,42,47,50,59,100,110,114,115,118]}]',
    s2Default: '[{"0":[67,74,83,86,89,137,141,151,155,162,167,172,181,186,197]}]',

    defaultCols: 200,
    defaultRows: 500,
    defaultCellSize: 3,

    // see getRuleStates function for ruleString to state transform
    rules: {
      // Pick out a rule name from the ruleNames map above
      ruleString: "",
      ruleName: "",

      // states is populated in getRuleStates()
      // called by loadState()
      states: {}
    },

    gameMode : false,
    mapMode : false,
    sandboxMode : false,

    teamNames: [],
    teamColors: [],

    columns : 0,
    rows : 0,
    cellSize: 0,

    waitTimeMs: 0,
    generation : 0,

    running : false,
    autoplay : false,

    // Cell colors
    //
    // alive color sets are either set by the game (game mode)
    // or set by the user via the schemes (sandbox mode)
    colors : {
      current : 0,
      schedule : false,
      dead: realBackgroundColor,
      alive: null,

      schemes : [
        {
          alive: ['#1a85ff', '#d41159'],
          alive_labels: ['Blue', 'Pink']
        },
        {
          alive: ['#ffc20a', '#0c7bdc'],
          alive_labels: ['Yellow', 'Blue']
        },
        {
          alive: ['#fefe62', '#d35fb7'],
          alive_labels: ['Yellow', 'Pink']
        },
        {
          alive: ['#e66100', '#9963ab'],
          alive_labels: ['Orange', 'Purple']
        },
        {
          alive: ['#3b9dff', '#dc3220'],
          alive_labels: ['Blue', 'Red']
        }
      ],
    },

    // Grid style
    grid : {
      current : 1,
      mapOverlay : false,

      schemes : [
        {
          color : gridStrokeColor1,
        },
        {
          color : '', // Special case: 0px grid
        },
      ],
    },

    // information about winner/loser
    showWinnersLosers : false,
    foundVictor : false,
    runningAvgWindow : [],
    runningAvgLast3 : [0.0, 0.0, 0.0],

    // Clear state
    clear : {
      schedule : false
    },

    // Average execution times
    times : {
      algorithm : 0,
      gui : 0
    },

    // DOM elements
    element : {
      generation : null,
      livecells : null,
      livecells1 : null,
      livecells2 : null,
      victory: null,
      team1color: null,
      team1name: null,
      team2color: null,
      tam2name: null,

      mapName: null,
      mapPanel: null,

      ruleNameEl: null,
      ruleEl: null,
      rulePanel: null,
    },

    // Initial state
    // Set in loadConfig()
    initialState1 : null,
    initialState2 : null,

    /**
     * On Load Event
     */
    init : function() {
      try {
        this.loading();
        this.listLife.init();   // Reset/init algorithm
        this.loadConfig();      // Load config from URL
        this.keepDOMElements(); // Keep DOM references (getElementsById)
        this.loadState();       // Load state from config
        // Previously, we had the following function calls here:
        //this.registerEvents();  // Register event handlers
        //this.prepare();
        // However, when loading data from an API, those calls
        // need to wait until the data has been loaded.
        // They were moved to inside the loadState() function.
      } catch (e) {
        console.log(e);
      }
    },

    loading : function() {
      this.loadingElem = document.getElementById('container-loading');
      this.loadingElem.classList.remove('invisible');
    },

    removeLoadingElem : function() {
      this.loadingElem.classList.add('invisible');
    },

    showControlsElem : function() {
      var controls = document.getElementById('container-golly-controls');
      controls.classList.remove('invisible');
    },

    showGridElem : function() {
      var canv = document.getElementById('container-canvas');
      canv.classList.remove('invisible');
    },

    /**
     * Get the map of different states and their corresponding outcome
     * for the given rule
     */
    getRuleStates : function(ruleString) {
      var states = {
        "222": ruleString[0],
        "221": ruleString[1], 
        "220": ruleString[2],  
        "212": ruleString[3],
        "211": ruleString[4],
        "210": ruleString[5],
        "202": ruleString[6],
        "201": ruleString[7],
        "200": ruleString[8],
        "122": ruleString[9],
        "121": ruleString[10],
        "120": ruleString[11],
        "112": ruleString[12],
        "111": ruleString[13],
        "110": ruleString[14],
        "102": ruleString[15],
        "101": ruleString[16],
        "100": ruleString[17],
        "022": ruleString[18],
        "021": ruleString[19],
        "020": ruleString[20],
        "012": ruleString[21],
        "011": ruleString[22],
        "010": ruleString[23],
        "002": ruleString[24],
        "001": ruleString[25],
        "000": ruleString[26]
      };
      return states;
    },

    /**
     * Load config from URL
     *
     * This function loads configuration variables for later processing.
     * Here is how it works:
     * - if user provides gameId param, switch to game simulation mode
     * - if user provides no gameId param, switch to sandbox mode
     *   - if user provides map param, show map display
     *   - if user provides random param, don't show map display
     *   - if user provides s1 or s2 params, don't show map display
     *   - if user provides nothing, don't show map display
     * Any options that require data to be loaded are set elsewhere.
     */
    loadConfig : function() {
      var grid, zoom;

      // User providing gameId means we go to game mode
      this.gameId = this.helpers.getUrlParameter('gameId');

      // User NOT providing gameId means we go to sandbox mode
      // User can provide a map,
      this.patternName = this.helpers.getUrlParameter('patternName');
      // Or specify the random flag,
      this.random = parseInt(this.helpers.getUrlParameter('random'));
      // Or specify the states of the two colors
      this.s1user = this.helpers.getUrlParameter('s1');
      this.s2user = this.helpers.getUrlParameter('s2');

      if (this.gameId != null) {
        // Game simulation mode with map overlay
        this.gameMode = true;
        this.grid.mapOverlay = true;

      } else if (this.patternName != null) {
        // Map mode with map overlay
        this.mapMode = true;
        this.sandboxMode = true;
        this.grid.mapOverlay = true;

      } else if (this.random == 1) {
        // Random map
        this.sandboxMode = true;
        this.grid.mapOverlay = false;

      } else if ((this.s1user != null) || (this.s2user != null)) {
        // User-provided patterns
        this.sandboxMode = true;
        this.grid.mapOverlay = false;

      } else {
        // Default patterns
        this.sandboxMode = true;
        this.grid.mapOverlay = false;

      }

      // // Initialize the victor percent running average window array
      // var maxDim = 240;
      // // var maxDim = Math.max(2*this.columns, 2*this.rows);
      // for (var i = 0; i < maxDim; i++) {
      //   this.runningAvgWindow[i] = 0;
      // }

      // The following configuration/user variables can always be set,
      // regardless of whether in game mode, map mode, or sandbox mode

      // Initial grid config
      grid = parseInt(this.helpers.getUrlParameter('grid'), 10);
      if (isNaN(grid) || grid < 1 || grid > this.grid.schemes.length) {
        grid = 0;
      }
      this.grid.current = 1 - grid;

      // Add ?autoplay=1 to the end of the URL to enable autoplay
      this.autoplay = this.helpers.getUrlParameter('autoplay') === '1' ? true : this.autoplay;

      // // Get the current wait time (this is updated when the user changes it)
      // var x = document.getElementById("speed-slider").value;
      // this.waitTimeMs = Math.min(10**x, 1000);
    },

    /**
     * Load world state from config
     *
     * This method is complicated because it loads the data,
     * and a lot of other actions have to wait for the data
     * to be loaded before they can be completed.
     */
    loadState : function() {

      // Set the rule string, then the rule name
      var ruleString = this.getRuleStringFromUrlSafely();
      if (ruleString==="") {
        ruleString = randomRuleString;
        ruleName = randomRuleName;
      } else {
        ruleName = "User Rule";
      }
      this.rules.ruleString = ruleString;
      this.rules.ruleName = ruleName;

      // Use the rule string to get states (outcomes)
      var ruleStates = this.getRuleStates(ruleString);
      this.rules.states = ruleStates;

      if (this.gameId != null) {

        // ~~~~~~~~~~ GAME MODE ~~~~~~~~~~

        // Load a game from the /game API endpoint
        let url = this.baseApiUrl + '/game/' + this.gameId;
        fetch(url)
        .then(res => res.json())
        .then((gameApiResult) => {
      
          // Remove loading message, show controls and grid
          this.removeLoadingElem();
          this.showControlsElem();
          this.showGridElem();

          this.gameApiResult = gameApiResult;

          // Set the game title
          var gameTitleElem = document.getElementById('golly-game-title');
          if (gameApiResult.isPostseason == true) {
            var sp1 = gameApiResult.season + 1;
            gameTitleElem.innerHTML = gameApiResult.description + " <small>- S" + sp1 + "</small>";
          } else {
            var sp1 = gameApiResult.season + 1;
            var dp1 = gameApiResult.day + 1;
            var descr = "Dragon Cup: Season " + sp1 + " Day " + dp1;
            gameTitleElem.innerHTML = descr;
          }

          // Determine if we know a winner/loser
          if (this.gameApiResult.hasOwnProperty('team1Score') && this.gameApiResult.hasOwnProperty('team2Score')) {
            var s1 = this.gameApiResult.team1Score;
            var s2 = this.gameApiResult.team2Score;
            this.showWinnersLosers = true;
            if (s1 > s2) {
              this.whoWon = 1;
            } else {
              this.whoWon = 2;
            }
          }

          this.setTeamNames();
          this.setColors();
          this.drawIcons();

          // Map initial conditions
          this.initialState1 = this.gameApiResult.initialConditions1;
          this.initialState2 = this.gameApiResult.initialConditions2;
          this.columns = this.gameApiResult.columns;
          this.rows = this.gameApiResult.rows;
          this.cellSize = this.gameApiResult.cellSize;
          this.mapName = this.gameApiResult.mapName;

          this.rules.ruleName = this.gameApiResult.ruleName;
          this.rules.ruleString = this.gameApiResult.rule;

          // Use the rule string to get states (outcomes)
          var ruleStates = this.getRuleStates(this.rules.ruleString);
          this.rules.states = ruleStates;

          this.setZoomState();
          this.setInitialState();

          this.updateRuleLabels();
          this.updateMapLabels();
          this.updateTeamNamesColors();
          this.updateTeamRecords();
          this.updateGameInitCounts();
          this.updateGameControls();
          this.updateWinLossLabels();

          this.canvas.init();
          this.registerEvents();
          this.prepare()

        })
        .catch(err => { throw err });
        // Done loading game from /game API endpoint

      } else if (this.patternName != null) {

        // ~~~~~~~~~~ MAP MODE ~~~~~~~~~~

        // Get user-specified rows/cols, if any
        var rows = this.getRowsFromUrlSafely();
        var cols = this.getColsFromUrlSafely();

        // // get rulestring
        // var ruleString = this.getRuleStringFromUrlSafely();
        // if (ruleString==="") {
        //   // user did not specify a rulestring
        //   ruleString = randomRuleString;
        //   ruleName = randomRuleName;
        // } else {
        //   ruleName = "User Rule";
        // }
        // this.rules.ruleString = ruleString;
        // this.rules.ruleName = ruleName;

        // Load a map from the /map API endpoint
        let url = this.mapsApiUrl + '/map/dragon/' + this.patternName + '/r/' + this.getRowsFromUrlSafely() + '/c/' + this.getColsFromUrlSafely();
        fetch(url)
        .then(res => res.json())
        .then((mapApiResult) => {

          // Remove loading message, show controls and grid
          this.removeLoadingElem();
          this.showControlsElem();
          this.showGridElem();

          // Set the game title
          var gameTitleElem = document.getElementById('golly-game-title');
          gameTitleElem.innerHTML = "Dragon Map: " + mapApiResult.mapName;

          this.setTeamNames();
          this.setColors();

          // Initial conditions
          this.initialState1 = mapApiResult.initialConditions1;
          this.initialState2 = mapApiResult.initialConditions2;
          this.columns = mapApiResult.columns;
          this.rows = mapApiResult.rows;
          this.cellSize = mapApiResult.cellSize;

          this.mapName = mapApiResult.mapName;
          this.mapZone1Name = mapApiResult.mapZone1Name;
          this.mapZone2Name = mapApiResult.mapZone2Name;
          this.mapZone3Name = mapApiResult.mapZone3Name;
          this.mapZone4Name = mapApiResult.mapZone4Name;

          this.setZoomState();
          this.setInitialState();

          this.updateRuleLabels();
          this.updateMapLabels();
          this.updateTeamNamesColors();
          this.updateTeamRecords();
          this.updateGameInitCounts();
          this.updateGameControls();

          this.canvas.init();
          this.registerEvents();
          this.prepare()

        })
        .catch(err => { throw err });
        // Done loading pattern from /map API endpoint

      } else {

        // ~~~~~~~~~~ PLAIN OL SANDBOX MODE ~~~~~~~~~~

        // // get rulestring
        // var ruleString = this.getRuleStringFromUrlSafely();
        // if (ruleString==="") {
        //   // user did not specify a rulestring
        //   ruleString = randomRuleString;
        //   ruleName = randomRuleName;
        // } else {
        //   ruleName = "User Rule";
        // }
        // this.rules.ruleString = ruleString;
        // this.rules.ruleName = ruleName;

        this.setTeamNames();
        this.setColors();
        this.setZoomState();

        if ((this.s1user != null) || (this.s2user != null)) {
          if (this.s1user != null) {
            this.initialState1 = this.s1user;
          } else {
            this.initialState1 = [{}];
          }
          if (this.s2user != null) {
            this.initialState2 = this.s2user;
          } else {
            this.initialState2 = [{}];
          }

          // Set the game title
          var gameTitleElem = document.getElementById('golly-game-title');
          gameTitleElem.innerHTML = "Dragon Sandbox";

        } else {
          this.initialState1 = this.s1Default;
          this.initialState2 = this.s2Default;

          // Set the game title
          var gameTitleElem = document.getElementById('golly-game-title');
          gameTitleElem.innerHTML = "Dragon Sandbox";

        }

        // Remove loading message, show controls and grid
        this.removeLoadingElem();
        this.showControlsElem();
        this.showGridElem();

        this.setInitialState();

        this.updateRuleLabels();
        this.updateMapLabels();
        this.updateTeamNamesColors();
        this.updateTeamRecords();
        this.updateGameInitCounts();
        this.updateGameControls();

        this.canvas.init();
        this.registerEvents();
        this.prepare()
      }
    },

    /**
     * Update the Game of Life with initial cell counts/stats.
     */
    updateGameInitCounts : function() {

      // Update live counts for initial state
      this.element.generation.innerHTML = '0';
      var liveCounts = this.getCounts();
      this.updateStatisticsElements(liveCounts);
      // If either cell count is 0 to begin with, disable victory check
      this.zeroStart = false;
      if (liveCounts.liveCells1==0 || liveCounts.liveCells2==0) {
        this.zeroStart = true;
      }
    },

    /**
     * Update the Game of Life scoreboard with winner/loser
     * indicators, if this is a game and we know the score.
     * This is only done once @ beginning when we load state.
     */
    updateWinLossLabels : function() {
      if (this.gameMode === true) {
        // Indicate winner/loser, if we know
        if (this.showWinnersLosers) {
          if (this.whoWon == 1) {
            this.element.team1winner.innerHTML = 'W';
            this.element.team2loser.innerHTML = 'L';
          } else if (this.whoWon == 2) {
            this.element.team2winner.innerHTML = 'W';
            this.element.team1loser.innerHTML = 'L';
          } else {
            // should only be here if already a victor,
            // but the user pressed clear
            this.showWinnersLosers = false;
          }
        }
      }
    },

    /**
     * Update the Game of Life controls depending on what mode we're in.
     */
    updateGameControls : function() {
      if (this.gameMode === true) {
        // In game mode, hide controls that the user won't need
        this.element.clearButton.remove();
      }
    },

    /**
     * Update rule labels using loaded rule data
     */
    updateRuleLabels : function() {
      this.element.ruleNameEl.innerHTML = this.rules.ruleName;
      this.element.ruleEl.innerHTML = this.rules.ruleString;
    },

    /**
     * Update map labels using loaded map label data
     */
    updateMapLabels : function() {
      if (this.grid.mapOverlay===true) {
        this.element.mapName.innerHTML = this.mapName;
      } else {
        // Remove the Map line from the scoreboard
        this.element.mapPanel.remove();
      }

    },

    /**
     * Set the names of the two teams
     */
    setTeamNames : function() {
      if (this.gameMode === true) {
        // If game mode, get team names from game API result
        this.teamNames = [this.gameApiResult.team1Name, this.gameApiResult.team2Name];
      } else {
        // Use color labels
        this.teamNames = this.colors.schemes[this.colors.current].alive_labels;
      }
    },
      
    /**
     * Set the default color palatte.
     * There is a default set of color pallettes that are colorblind-friendly.
     * In game mode, we insert the two teams' default colors,
     * but still allow folks to cycle through other color schemes.
     */
    setColors : function() {
      if (this.gameMode === true) {
        // Modify the color schemes available:
        // - insert the two teams' original color schemes in front
        // - update the labels for each color scheme to be the team names
        this.colors.schemes.unshift({
          alive : [this.gameApiResult.team1Color, this.gameApiResult.team2Color],
          alive_labels : [this.gameApiResult.team1Name, this.gameApiResult.team2Name]
        });
        this.colors.current = 0;
        this.colors.alive = this.colors.schemes[this.colors.current].alive;

      } else {
        // Parse color options and pick out scheme
        colorpal = parseInt(this.helpers.getUrlParameter('color'));
        if (isNaN(colorpal) || colorpal < 1 || colorpal > this.colors.schemes.length) {
          colorpal = 1;
        }
        this.colors.current = colorpal - 1;
        this.colors.alive = this.colors.schemes[this.colors.current].alive;
      }
    },

    /**
     * Draw the icons for each team.
     * Get data from the /teams endpoint first.
     * Team abbreviation.
     * This is only called when in gameMode.
     */
    drawIcons : function() {

      // Get team abbreviations from /teams endpoint
      // (abbreviations are used to get svg filename)
      let url = this.baseApiUrl + '/teams/' + this.gameApiResult.season;
      fetch(url)
      .then(res => res.json())
      .then((teamApiResult) => {

        this.teamApiResult = teamApiResult;

        // Assemble team1/2 abbreviations
        var teamAbbrs = ['', ''];
        var k;
        for (k = 0; k < teamApiResult.length; k++) {
          if (teamApiResult[k].teamName == this.gameApiResult.team1Name) {
            teamAbbrs[0] = teamApiResult[k].teamAbbr.toLowerCase();
          }
          if (teamApiResult[k].teamName == this.gameApiResult.team2Name) {
            teamAbbrs[1] = teamApiResult[k].teamAbbr.toLowerCase();
          }
        }

        // Assemble team1/2 colors/names
        var teamColors = [this.gameApiResult.team1Color, this.gameApiResult.team2Color];
        var teamNames = [this.gameApiResult.team1Name, this.gameApiResult.team2Name];

        // For each team, make a new <object> tag
        // that gets data from an svg file.
        var iconSize = "25";
        var i;
        for (i = 0; i < 2; i++) {
          var ip1 = i + 1;
          var containerId = "team" + ip1 + "-icon-container";
          var iconId = "team" + ip1 + "-icon";

          var container = document.getElementById(containerId);
          var svg = document.createElement("object");
          svg.setAttribute('type', 'image/svg+xml');
          svg.setAttribute('data', '../img/' + teamAbbrs[i].toLowerCase() + '.svg');
          svg.setAttribute('height', iconSize);
          svg.setAttribute('width', iconSize);
          svg.setAttribute('id', iconId);
          svg.classList.add('icon');
          svg.classList.add('team-icon');
          svg.classList.add('invisible');
          container.appendChild(svg);

          // Wait a little bit for the data to load,
          // then modify the color and make it visible
          var paint = function(color, elemId) {
            var mysvg = $('#' + elemId).getSVG();
            var child = mysvg.find("g path:first-child()");
            if (child.length > 0) {
              child.attr('fill', color);
              $('#' + elemId).removeClass('invisible');
            }
          }
          // This fails pretty often, so try a few times.
          setTimeout(paint, 100,  teamColors[i], iconId);
          setTimeout(paint, 250,  teamColors[i], iconId);
          setTimeout(paint, 500,  teamColors[i], iconId);
          setTimeout(paint, 1000, teamColors[i], iconId);
          setTimeout(paint, 1500, teamColors[i], iconId);
        }

      })
      .catch();
      // Note: intentionally do nothing.
      // If we can't figure out how to draw
      // the team icon, just leave it be.

    },

    /*
     * Parse the user-provided URL parameter "rule"
     * and check whether it is a valid ternary-state
     * rule. Return it if so, otherwise return empty string.
     * Used by getRuleString().
     */
    getRuleStringFromUrlSafely : function() {
      var userRule = this.helpers.getUrlParameter('rule');
      var userRuleString = String(userRule);

      if (userRule != null) {

        // Validate the rule string:

        // Must be the correct length
        var correctLength = userRuleString.length===27;

        // Must consist only of 0, 1, 2
        var correctStates = true;
        var i;
        for (i=0; i<userRuleString.length; i++) {
          if (!( userRuleString[i]=="0" || userRuleString[i]=="1" || userRuleString[i]=="2")) {
            correctStates = false;
            break;
          }
        }
        if (correctLength && correctStates) {
          return userRuleString;
        } else {
          // User provided an invalid rule string
          var message = "";
          message = userRuleString + ' is not a valid Dragon Cup rule!\n';
          if (!correctLength) {
            message += 'Rule strings must be length 27, yours is length ' + userRuleString.length;
          } else if (!correctStates) {
            message += 'Rule strings must consist of the characters {0,1,2} only';
          }
          alert(message);
        }

      }

      return "";
    },

    getRowsFromUrlSafely : function() {
      // Get the number of rows from the URL parameters,
      // checking the specified value and setting to default
      // if invalid or not specified
      rows = parseInt(this.helpers.getUrlParameter('rows'));
      if (isNaN(rows) || rows < 0 || rows > 1000) {
        rows = this.defaultRows;
      }
      if (rows >= 200) {
        // Turn off the grid
        this.grid.current = 1;
      }
      return rows;
    },

    getColsFromUrlSafely : function() {
      // Get the number of cols from the URL parameters,
      // checking the specified value and setting to default
      // if invalid or not specified
      cols = parseInt(this.helpers.getUrlParameter('cols'));
      if (isNaN(cols) || cols < 0 || cols > 1000) {
        cols = this.defaultCols;
      }
      if (cols >= 200) {
        // Turn off the grid
        this.grid.current = 1;
      }
      return cols;
    },

    getCellSizeFromUrlSafely : function() {
      // Get the cell size from the URL parameters,
      // checking the specified value and setting to default
      // if invalid or not specified
      cellSize = parseInt(this.helpers.getUrlParameter('cellSize'));
      if (isNaN(cellSize) || cellSize < 1 || cellSize > 10) {
        cellSize = this.defaultCellSize;
      }
      if (cellSize <= 5) {
        // Turn off the grid
        this.grid.current = 1;
      }
      return cellSize;
    },

    /**
     * Set number of rows/columns and cell size.
     */
    setZoomState : function() {
      if (this.gameMode === true || this.mapMode === true) {
        /* we are all good
        this.columns  = this.mapApiResult.columns;
        this.rows     = this.mapApiResult.rows;
        this.cellSize = this.mapApiResult.cellSize;
         */
      } else {
        this.columns = this.getColsFromUrlSafely();
        this.rows = this.getRowsFromUrlSafely();
        this.cellSize = this.getCellSizeFromUrlSafely();
      }
    },

    /**
     * Parse the initial state variables s1/s2.
     * Initialize the internal state of the simulator.
     *
     * The internal state is stored as a list of live cells,
     * in the form of an array of arrays with this scheme:
     * [
     *   [ y1, x1, x2, x3, x4, x5 ],
     *   [ y2, x6, x7, x8, x9, x10 ],
     *   ...
     * ]
     */
    setInitialState : function() {

      // state 1 parameter
      state1 = jsonParse(decodeURI(this.initialState1));
      var irow, icol, y;
      for (irow = 0; irow < state1.length; irow++) {
        for (y in state1[irow]) {
          for (icol = 0 ; icol < state1[irow][y].length ; icol++) {
            var yy = parseInt(y);
            var xx = state1[irow][yy][icol];
            this.listLife.addCell(xx, yy, this.listLife.actualState);
            this.listLife.addCell(xx, yy, this.listLife.actualState1);
          }
        }
      }

      // state 2 parameter
      state2 = jsonParse(decodeURI(this.initialState2));
      var irow, icol, y;
      for (irow = 0; irow < state2.length; irow++) {
        for (y in state2[irow]) {
          for (icol = 0 ; icol < state2[irow][y].length ; icol++) {
            var yy = parseInt(y);
            var xx = state2[irow][yy][icol];
            this.listLife.addCell(xx, yy, this.listLife.actualState);
            this.listLife.addCell(xx, yy, this.listLife.actualState2);
          }
        }
      }
    },


    /**
     * Clean up actual state and prepare a new run
     */
    cleanUp : function() {
      this.listLife.init(); // Reset/init algorithm
      this.prepare();
    },

    approxEqual : function(a, b, tol) {
      var aa = parseFloat(a);
      var bb = parseFloat(b);
      var smol = 1e-12;
      return Math.abs(a-b)/Math.abs(a + smol) < tol;
    },

    /**
     * Check for a victor
     */
    checkForVictor : function(liveCounts) {
      if (this.zeroStart===true) {
        return;
      }

      if (this.generation===(this.rows-1)) {
        if (liveCounts.liveCells1 > liveCounts.liveCells2) {
          this.whoWon = 1;
          this.foundVictor = true;
          this.showWinnersLosers = true;
          this.handlers.buttons.run();
          this.running = false;
        } else if (liveCounts.liveCells1 < liveCounts.liveCells2) {
          this.whoWon = 2;
          this.foundVictor = true;
          this.showWinnersLosers = true;
          this.handlers.buttons.run();
          this.running = false;
        }
      }
    },

    /**
     * Update the statistics
     */
    updateStatisticsElements : function(liveCounts) {
      this.element.livecells.innerHTML  = liveCounts.liveCells;
      this.element.livecells1.innerHTML = liveCounts.liveCells1;
      this.element.livecells2.innerHTML = liveCounts.liveCells2;
      this.element.victory.innerHTML    = liveCounts.victoryPct.toFixed(1) + "%";
      // this.element.territory1.innerHTML = liveCounts.territory1.toFixed(2) + "%";
      // this.element.territory2.innerHTML = liveCounts.territory2.toFixed(2) + "%";
    },

    /**
     * Prepare DOM elements and Canvas for a new run
     */
    prepare : function() {
      this.generation = this.times.algorithm = this.times.gui = 0;
      this.mouseDown = this.clear.schedule = false;

      this.canvas.clearWorld(); // Reset GUI
      this.canvas.drawWorld(); // Draw State

      if (this.autoplay) { // Next Flow
        this.autoplay = false;
        this.handlers.buttons.run();
      }
    },

    updateTeamRecords : function() {
      if (this.gameMode === true) {
        var game = this.gameApiResult;
        if (game.isPostseason) {
          // Postseason: win-loss record in current series
          var swlstr1 = game.team1SeriesWinLoss[0] + "-" + game.team1SeriesWinLoss[1];
          var swlstr2 = game.team2SeriesWinLoss[0] + "-" + game.team2SeriesWinLoss[1];
          this.element.team1wlrec.innerHTML = swlstr1;
          this.element.team2wlrec.innerHTML = swlstr2;
        } else {
          // Season: win-loss record to date
          var wlstr1 = game.team1WinLoss[0] + "-" + game.team1WinLoss[1];
          var wlstr2 = game.team2WinLoss[0] + "-" + game.team2WinLoss[1];
          this.element.team1wlrec.innerHTML = wlstr1;
          this.element.team2wlrec.innerHTML = wlstr2;
        }
      } else {

        // TODO When not in game mode, do the following:
        // - remove table columns for records and rainbows
        // - shrink icons column to 0px
        // - shrink scoreboard container to sm-4
        var elems;
        var i, j, k;

        // Delete unused columns from scoreboard table
        var idsToDelete = ['scoreboard-table-column-icon', 'scoreboard-table-column-spacing', 'scoreboard-table-column-record'];
        for(i = 0; i < idsToDelete.length; i++) {
          idToDelete = idsToDelete[i];
          elems = document.getElementsByClassName(idToDelete);
          while(elems[0]) {
            elems[0].parentNode.removeChild(elems[0]);
          }
        }

        // Shrink scoreboard container to sm-4
        var elem = document.getElementById('scoreboard-panels-container');
        elem.classList.remove('col-sm-8');
        elem.classList.add('col-sm-4');

      }
    },

    updateTeamNamesColors : function() {
      var i, e;
      for (i = 0; i < this.element.team1color.length; i++) {
        e = this.element.team1color[i];
        e.style.color = this.colors.alive[0];
      }
      for (i = 0; i < this.element.team2color.length; i++) {
        e = this.element.team2color[i];
        e.style.color = this.colors.alive[1];
      }
      for (i = 0; i < this.element.team1name.length; i++) {
        e = this.element.team1name[i];
        e.innerHTML = this.teamNames[0];
      }
      for (i = 0; i < this.element.team2name.length; i++) {
        e = this.element.team2name[i];
        e.innerHTML = this.teamNames[1];
      }
    },

    getCounts : function() {
      var liveCounts = GOL.listLife.getLiveCounts();
      return liveCounts;
    },

    /**
     * keepDOMElements
     * Save DOM references for this session (one time execution)
     */
    keepDOMElements : function() {
      this.element.generation = document.getElementById('generation');
      this.element.livecells  = document.getElementById('livecells');
      this.element.livecells1 = document.getElementById('livecells1');
      this.element.livecells2 = document.getElementById('livecells2');

      this.element.team1wlrec = document.getElementById("team1record");
      this.element.team2wlrec = document.getElementById("team2record");
      this.element.team1wlrecCont = document.getElementById("team1record-container");
      this.element.team2wlrecCont = document.getElementById("team2record-container");

      this.element.victory    = document.getElementById('victoryPct');
      // this.element.territory1 = document.getElementById('territory1');
      // this.element.territory2 = document.getElementById('territory2');

      this.element.team1color = document.getElementsByClassName("team1color");
      this.element.team1name  = document.getElementsByClassName("team1name");

      this.element.team2color = document.getElementsByClassName("team2color");
      this.element.team2name  = document.getElementsByClassName("team2name");

      this.element.clearButton = document.getElementById('buttonClear');
      this.element.colorButton = document.getElementById('buttonColors');

      this.element.mapName = document.getElementById('mapname-label');
      this.element.mapPanel = document.getElementById('stats-panel-map');

      this.element.ruleNameEl = document.getElementById('rule-name-label');
      this.element.ruleEl = document.getElementById('rule-label');
      this.element.rulePanel = document.getElementById('scoreboard-panel-rule');

      this.element.speedSlider = document.getElementById('speed-slider');

      this.element.team1winner = document.getElementById('team1winner');
      this.element.team2winner = document.getElementById('team2winner');
      this.element.team1loser = document.getElementById('team1loser');
      this.element.team2loser = document.getElementById('team2loser');
    },


    /**
     * registerEvents
     * Register event handlers for this session (one time execution)
     */
    registerEvents : function() {

      // Keyboard Events
      this.helpers.registerEvent(document.body, 'keyup', this.handlers.keyboard, false);
      // Controls
      this.helpers.registerEvent(document.getElementById('buttonRun'), 'click', this.handlers.buttons.run, false);
      this.helpers.registerEvent(document.getElementById('buttonStep'), 'click', this.handlers.buttons.step, false);
      if (this.sandboxMode === true || this.mapMode === true) {
        // Clear control only available in sandbox or map mode
        this.helpers.registerEvent(document.getElementById('buttonClear'), 'click', this.handlers.buttons.clear, false);
      }

      // Speed control slider
      this.helpers.registerEvent(document.getElementById('speed-slider'), 'input', this.handlers.buttons.speedControl, false);

      // Layout
      this.helpers.registerEvent(document.getElementById('buttonGrid'), 'click', this.handlers.buttons.grid, false);
      this.helpers.registerEvent(document.getElementById('buttonColors'), 'click', this.handlers.buttons.colorcycle, false);
    },

    /**
     * Run Next Step
     */
    nextStep : function() {

      var i, x, y, r;
      var liveCellNumbers, liveCellNumber, liveCellNumber1, liveCellNumber2;
      var algorithmTime, guiTime;

      // Algorithm run

      algorithmTime = (new Date());

      liveCounts = GOL.listLife.nextGeneration();

      algorithmTime = (new Date()) - algorithmTime;


      // Canvas run

      guiTime = (new Date());

      for (i = 0; i < GOL.listLife.redrawList.length; i++) {
        x = GOL.listLife.redrawList[i][0];
        y = GOL.listLife.redrawList[i][1];

        if (GOL.listLife.redrawList[i][2] === 1) {
          GOL.canvas.changeCelltoAlive(x, y);
        } else if (GOL.listLife.redrawList[i][2] === 2) {
          GOL.canvas.keepCellAlive(x, y);
        } else {
          GOL.canvas.changeCelltoDead(x, y);
        }
      }

      guiTime = (new Date()) - guiTime;

      // Post-run updates

      // Change Grid
      if (GOL.grid.schedule) {
        GOL.grid.schedule = false;
        GOL.canvas.drawWorld();
      }

      // Change Colors
      if (GOL.colors.schedule) {
        GOL.colors.schedule = false;
        GOL.canvas.drawWorld();
      }

      // Running Information
      GOL.generation++;
      // This should probably be in an updateGeneration() function
      GOL.element.generation.innerHTML = GOL.generation;

      // Update statistics
      GOL.updateStatisticsElements(liveCounts);

      // Check for victor
      GOL.checkForVictor(liveCounts);

      // Update winner/loser if found
      if (GOL.showWinnersLosers) {
        if (GOL.whoWon == 1) {
          GOL.element.team1winner.innerHTML = 'W';
          GOL.element.team2loser.innerHTML = 'L';
        } else {
          GOL.element.team2winner.innerHTML = 'W';
          GOL.element.team1loser.innerHTML = 'L';
        }
      }

      r = 1.0/GOL.generation;
      GOL.times.algorithm = (GOL.times.algorithm * (1 - r)) + (algorithmTime * r);
      GOL.times.gui = (GOL.times.gui * (1 - r)) + (guiTime * r);

      var v = this.helpers.getWaitTimeMs();

      // Sleepy time before going on to next step
      setTimeout(() => {
        // Flow Control
        if (GOL.running) {
          GOL.nextStep();
        } else {
          if (GOL.clear.schedule) {
            GOL.cleanUp();
          }
        }
      }, v);

    },


    /** ****************************************************************************************************************************
     * Event Handlers
     */
    handlers : {

      mouseDown : false,
      lastX : 0,
      lastY : 0,


      /**
       * When user clicks down, set mouse down state
       * and change change cell alive/dead state at
       * the current mouse location.
       * (sandbox mode only)
       *
       * Dragon Cup changes:
       * In map or sandbox mode:
       * - if a user clicks on a cell BELOW the (current) last row,
       *   the click is applied to the last row.
       * - if a user clicks on a cell ABOVE the (current) last row,
       *   the click does nothing.
       *
       */
      canvasMouseDown : function(event) {
        if (GOL.sandboxMode === true || GOL.mapMode === true) {
          var position = GOL.helpers.mousePosition(event);
          GOL.handlers.lastX = position[0];
          GOL.handlers.lastY = position[1];
          if (position[1] >= GOL.generation ) {
            GOL.canvas.switchCell(position[0], GOL.generation);
          }
          GOL.handlers.mouseDown = true;
        }
      },


      /**
       * Handle user mouse up instance.
       * (sandbox mode only)
       */
      canvasMouseUp : function() {
        if (GOL.sandboxMode === true || GOL.mapModed === true) {
          GOL.handlers.mouseDown = false;
        }
      },


      /**
       * If we have captured a mouse down event,
       * track where the mouse is going and change
       * cell alive/dead state at mouse location.
       * (sandbox mode only)
       *
       * Dragon Cup changes:
       * - if a user has clicked down and moves the mouse,
       *   check whether mouse has moved in x direction,
       *   if not we don't have anything to do,
       *   otherwise check if mouse is moving above/below current generation row
       *   if BELOW current gen row, turn cells on/off
       *   if ABOVE current gen row, do nothing
       */
      canvasMouseMove : function(event) {
        if (GOL.sandboxMode === true || GOL.mapMode === true) {
          if (GOL.handlers.mouseDown) {
            var position = GOL.helpers.mousePosition(event);
            if ((position[0] !== GOL.handlers.lastX) || (position[1] !== GOL.handlers.lastY)) {
              if (position[1] >= GOL.generation ) {
                GOL.canvas.switchCell(position[0], GOL.generation);
              }
              GOL.handlers.lastX = position[0];
              GOL.handlers.lastY = position[1];
            }
          }
        }
      },


      /**
       * Allow keyboard shortcuts
       */
      keyboard : function(e) {
        var event = e;
        if (!event) {
          event = window.event;
        }

        if (event.keyCode === 67) { // Key: C
          // User can only clear the board in sandbox mode
          if (GOL.sandboxMode === true || GOL.mapMode === true) {
            GOL.handlers.buttons.clear();
          }

        } else if (event.keyCode === 82 ) { // Key: R
          GOL.handlers.buttons.run();

        } else if (event.keyCode === 83 ) { // Key: S
          if (GOL.running) {
            // If running, S will stop the simulation
            GOL.handlers.buttons.run();
          } else if (!GOL.foundVictor) {
            GOL.handlers.buttons.step();
          }

        } else if (event.keyCode === 70 ) { // Key: F
          var speed = GOL.element.speedSlider.value;
          speed = speed - 1;
          if (speed===0) {
            speed = 4;
          }
          GOL.element.speedSlider.value = speed;

        } else if (event.keyCode === 71 ) { // Key: G
          GOL.handlers.buttons.grid();

        }
      },


      buttons : {

        /**
         * Button Handler - Run
         */
        run : function() {

          if (!GOL.foundVictor) {
            GOL.running = !GOL.running;
          } else {
            GOL.running = false;
          }
          // Update run/stop button state
          if (GOL.running) {
            GOL.nextStep();
            document.getElementById('buttonRun').innerHTML = '<u>S</u>top';
            document.getElementById('buttonRun').classList.remove("btn-success");
            document.getElementById('buttonRun').classList.add("btn-danger");
          } else {
            document.getElementById('buttonRun').innerHTML = '<u>R</u>un';
            document.getElementById('buttonRun').classList.remove("btn-danger");
            document.getElementById('buttonRun').classList.add("btn-success");
          }
        },


        /**
         * Button Handler - Next Step - One Step only
         */
        step : function() {
          if (!GOL.running && !GOL.foundVictor) {
            GOL.nextStep();
          }
        },


        /**
         * Button Handler - Clear World
         */
        clear : function() {
          if (GOL.sandboxMode === true || GOL.mapMode === true) {
            if (GOL.running) {
              GOL.clear.schedule = true;
              GOL.running = false;
              $("#buttonRun").text("Run");
              document.getElementById('buttonRun').classList.remove("btn-danger");
              document.getElementById('buttonRun').classList.add("btn-success");
            } else {
              GOL.cleanUp();

              //////////////////////////////////////////
              // DO IT (CLEAR BUTTON CLEANUP) HERE

              // If we found a victor and the user pressed clear, reset foundVictor
              GOL.foundVictor = false;
              GOL.whoWon = 0;
              GOL.showWinnersLosers = false;
              GOL.element.team1winner.innerHTML = '';
              GOL.element.team2winner.innerHTML = '';
              GOL.element.team1loser.innerHTML = '';
              GOL.element.team2loser.innerHTML = '';

              // GOL.listLife.actualState{1,2} should now be empty
              liveCounts = GOL.getCounts();
              // liveCounts should have 0 cells everywhere
              GOL.updateStatisticsElements(liveCounts);
              // This should probably be in an updateGeneration() function
              GOL.element.generation.innerHTML = 0;

              // DONE WITH CLEAR BUTTON CLEANUP
              //////////////////////////////////////////
            }
          }
        },


        /**
         * Cycle through the color schemes
         */
        colorcycle : function() {
          GOL.colors.current = (GOL.colors.current + 1) % GOL.colors.schemes.length;
          GOL.colors.alive = GOL.colors.schemes[GOL.colors.current].alive;
          if (GOL.gameMode === false) {
            GOL.teamNames = GOL.colors.schemes[GOL.colors.current].alive_labels;
          }
          GOL.updateTeamNamesColors();
          if (GOL.running) {
            GOL.colors.schedule = true; // Delay redraw
          } else {
            GOL.canvas.drawWorld(); // Force complete redraw
          }
        },

        /**
         * Show/hide the grid
         */
        grid : function() {
          GOL.grid.current = (GOL.grid.current + 1) % GOL.grid.schemes.length;
          if (GOL.running) {
            GOL.grid.schedule = true; // Delay redraw
          } else {
            GOL.canvas.drawWorld(); // Force complete redraw
          }
        },

        /**
         * Update simulation speed
         */
        speedControl : function() {
          // We don't need to do anything with the
          // speed slider value here.
          // The getWaitTimeMs function will read
          // the value of the speed slider directly.
        },

      },

    },


    /** ****************************************************************************************************************************
     *
     */
    canvas: {

      context : null,
      width : null,
      height : null,
      age : null,
      cellSize : null,
      cellSpace : null,


      /**
       * init
       */
      init : function() {

        this.canvas = document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.cellSize = GOL.cellSize;
        this.cellSpace = 1;

        // register the mousedown/mouseup/mousemove events with function callbacks
        GOL.helpers.registerEvent(this.canvas, 'mousedown', GOL.handlers.canvasMouseDown, false);
        GOL.helpers.registerEvent(document, 'mouseup', GOL.handlers.canvasMouseUp, false);
        GOL.helpers.registerEvent(this.canvas, 'mousemove', GOL.handlers.canvasMouseMove, false);

        this.clearWorld();
      },


      /**
       * clearWorld
       */
      clearWorld : function () {
        var i, j;

        // Init ages (Canvas reference)
        this.age = [];
        for (i = 0; i < GOL.columns; i++) {
          this.age[i] = [];
          for (j = 0; j < GOL.rows; j++) {
            this.age[i][j] = 0; // Dead
          }
        }
      },


      /**
       * drawWorld
       */
      drawWorld : function() {
        var i, j;

        // Special no grid case
        if (GOL.grid.schemes[GOL.grid.current].color === '') {
          this.setNoGridOn();
          this.width = this.height = 0;
        } else {
          this.setNoGridOff();
          this.width = this.height = 1;
        }

        // Dynamic canvas size
        this.width = this.width + (this.cellSpace * GOL.columns) + (this.cellSize * GOL.columns);
        this.canvas.setAttribute('width', this.width);

        this.height = this.height + (this.cellSpace * GOL.rows) + (this.cellSize * GOL.rows);
        this.canvas.setAttribute('height', this.height);

        // Fill background
        this.context.fillStyle = GOL.grid.schemes[GOL.grid.current].color;
        this.context.fillRect(0, 0, this.width, this.height);

        for (i = 0 ; i < GOL.columns; i++) {
          for (j = 0 ; j < GOL.rows; j++) {
            if (GOL.listLife.isAlive(i, j)) {
              this.drawCell(i, j, true);
            } else {
              this.drawCell(i, j, false);
            }
          }
        }

      },


      /**
       * setNoGridOn
       */
      setNoGridOn : function() {
        this.cellSize = GOL.cellSize + 1;
        this.cellSpace = 0;
      },


      /**
       * setNoGridOff
       */
      setNoGridOff : function() {
        this.cellSize = GOL.cellSize;
        this.cellSpace = 1;
      },


      /**
       * drawCell
       */
      drawCell : function (i, j, alive) {

        if (alive) {

          // color by... color
          this.context.fillStyle = GOL.colors.alive[GOL.listLife.getCellColor(i, j) - 1];

        } else {
          this.context.fillStyle = GOL.colors.dead;
        }

        this.context.fillRect(this.cellSpace + (this.cellSpace * i) + (this.cellSize * i), this.cellSpace + (this.cellSpace * j) + (this.cellSize * j), this.cellSize, this.cellSize);

        // Draw light strokes cutting the canvas through the middle
        if (i===parseInt(GOL.columns/2)) {
          if (GOL.grid.mapOverlay==true) {
            this.context.fillStyle = mapZoneStrokeColor;
            this.context.fillRect(
              (this.cellSpace * i+1) + (this.cellSize * i+1) - 2*this.cellSpace,
              (this.cellSpace * j) + (this.cellSize * j) + this.cellSpace,
              this.cellSpace,
              this.cellSize,
            );
          }
        }

        if (j===parseInt(GOL.rows/2)) {
          if (GOL.grid.mapOverlay==true) {
            this.context.fillStyle = mapZoneStrokeColor;
            this.context.fillRect(
              (this.cellSpace * i+1) + (this.cellSize * i+1) - 2*this.cellSpace,
              (this.cellSpace * j) + (this.cellSize * j) + this.cellSpace,
              this.cellSize,
              this.cellSpace,
            );
          }
        }

      },


      /**
       * switchCell
       * cmr - this is only activated when a user clicks on a cell
       */
      switchCell : function(i, j) {
        if (GOL.sandboxMode===true) {
          if (GOL.listLife.isAlive(i, j)) {
            if (GOL.listLife.getCellColor(i, j) == 1) {
              // Swap colors
              GOL.listLife.removeCell(i, j, GOL.listLife.actualState1);
              GOL.listLife.addCell(i, j, GOL.listLife.actualState2);
              this.keepCellAlive(i, j);
            } else {
              GOL.listLife.removeCell(i, j, GOL.listLife.actualState);
              GOL.listLife.removeCell(i, j, GOL.listLife.actualState2);
              this.changeCelltoDead(i, j);
            }
          } else {
            GOL.listLife.addCell(i, j, GOL.listLife.actualState);
            GOL.listLife.addCell(i, j, GOL.listLife.actualState1);
            this.changeCelltoAlive(i, j);
          }
        }
      },


      /**
       * keepCellAlive
       */
      keepCellAlive : function(i, j) {
        if (i >= 0 && i < GOL.columns && j >=0 && j < GOL.rows) {
          this.age[i][j]++;
          this.drawCell(i, j, true);
        }
      },


      /**
       * changeCelltoAlive
       */
      changeCelltoAlive : function(i, j) {
        if (i >= 0 && i < GOL.columns && j >=0 && j < GOL.rows) {
          this.age[i][j] = 1;
          this.drawCell(i, j, true);
        }
      },


      /**
       * changeCelltoDead
       */
      changeCelltoDead : function(i, j) {
        if (i >= 0 && i < GOL.columns && j >=0 && j < GOL.rows) {
          this.drawCell(i, j, false);
        }
      }

    },


    /** ****************************************************************************************************************************
     *
     */
    listLife : {

      actualState : [],
      actualState1 : [],
      actualState2 : [],
      redrawList : [],


      /**
       * Initialize the actual state array (?)
       */
      init : function () {
        this.actualState = [];
        this.actualState1 = [];
        this.actualState2 = [];
      },


      getLiveCounts : function() {
        var i, j;

        var state = GOL.listLife.actualState;
        var liveCells = 0;
        for (i = 0; i < state.length; i++) {
          if ((state[i][0] >= 0) && (state[i][0] < GOL.rows)) {
            for (j = 1; j < state[i].length; j++) {
              if ((state[i][j] >= 0) && (state[i][j] < GOL.columns)) {
                liveCells++;
              }
            }
          }
        }

        var state1 = GOL.listLife.actualState1;
        var liveCells1 = 0;
        for (i = 0; i < state1.length; i++) {
          if ((state1[i][0] >= 0) && (state1[i][0] < GOL.rows)) {
            for (j = 1; j < state1[i].length; j++) {
              if ((state1[i][j] >= 0) && (state1[i][j] < GOL.columns)) {
                liveCells1++;
              }
            }
          }
        }

        var state2 = GOL.listLife.actualState2;
        var liveCells2 = 0;
        for (i = 0; i < state2.length; i++) {
          if ((state2[i][0] >= 0) && (state2[i][0] < GOL.rows)) {
            for (j = 1; j < state2[i].length; j++) {
              if ((state2[i][j] >= 0) && (state2[i][j] < GOL.columns)) {
                liveCells2++;
              }
            }
          }
        }

        var victoryPct;
        if (liveCells1 > liveCells2) {
          victoryPct = liveCells1/(1.0*liveCells1 + liveCells2);
        } else {
          victoryPct = liveCells2/(1.0*liveCells1 + liveCells2);
        }
        victoryPct = victoryPct * 100;

        var totalArea = GOL.columns * GOL.rows;

        // var territory1 = liveCells1/(1.0*totalArea);
        // territory1 = territory1 * 100;
        // var territory2 = liveCells2/(1.0*totalArea);
        // territory2 = territory2 * 100;

        return {
          liveCells: liveCells,
          liveCells1 : liveCells1,
          liveCells2 : liveCells2,
          victoryPct : victoryPct,
          // territory1 : territory1,
          // territory2 : territory2,
        };
      },


      nextGeneration : function() {

        this.redrawList = [];

        // The generation tells us which row we're on
        // This is the new row
        var ym1 = GOL.generation;
        // This is the previous row
        var y = ym1 + 1;

        // Shortcuts
        var state = this.actualState;
        var state1 = this.actualState1;
        var state2 = this.actualState2;

        // -----
        // Now, get the index of actualState that corresponds to y-1
        var actualStatePrevIndex = -1;
        for (i = 0; i < state.length; i++) {
          if (state[i][0]==ym1) {
            actualStatePrevIndex = i;
          }
        }

        // Get the actualState x values corresponding to y-1
        // If we haven't found an index for y-1, it is not in actualState, so row has no x values
        var actualStatePrevXs;
        if (actualStatePrevIndex < 0) {
          actualStatePrevXs = [];
        } else {
          var row = state[actualStatePrevIndex];
          actualStatePrevXs = row.slice(1, row.length);
        }

        // Next, repeat the above procedure for state1 and state2 (yuck)

        // -----
        // State 1:
        var actualState1PrevIndex = -1;
        for (i = 0; i < state1.length; i++) {
          if (state1[i][0]==ym1) {
            actualState1PrevIndex = i;
          }
        }
        var actualState1PrevXs;
        if (actualState1PrevIndex < 0) {
          actualState1PrevXs = [];
        } else {
          var row = state1[actualState1PrevIndex];
          actualState1PrevXs = row.slice(1, row.length);
        }

        // -----
        // State 2:
        var actualState2PrevIndex = -1;
        for (i = 0; i < state2.length; i++) {
          if (state2[i][0]==ym1) {
            actualState2PrevIndex = i;
          }
        }
        var actualState2PrevXs;
        if (actualState2PrevIndex < 0) {
          actualState2PrevXs = [];
        } else {
          var row = state2[actualState2PrevIndex];
          actualState2PrevXs = row.slice(1, row.length);
        }

        // Prepare arrays to hold the next row
        var newRow = [y];
        var newRow1 = [y];
        var newRow2 = [y];

        var key = "";

        // Left boundary:
        key = "0";
        var j;
        for (j = 0; j < 2; j++) {
          if (actualStatePrevXs.indexOf(j) != -1) {
            if (actualState1PrevXs.indexOf(j) != -1) {
              key += "1";
            } else if (actualState2PrevXs.indexOf(j) != -1) {
              key += "2";
            } else {
              key += "0";
            }
          } else {
            key += "0";
          }
        }
        var leftBoundaryState = GOL.rules.states[key];
        if (leftBoundaryState > 0) {
          this.addCell(0, y, this.actualState);
          if (leftBoundaryState == 1) {
            this.addCell(0, y, this.actualState1);
          } else if (leftBoundaryState == 2) {
            this.addCell(0, y, this.actualState2);
          }
          this.redrawList.push([0, y, 1]);
        } else {
          this.redrawList.push([0, y, 0]);
        }

        // Internal:
        for (j = 1; j < GOL.columns - 1; j++) {
          key = "";
          var k;
          for (k = j-1; k <= j+1; k++) {
            if (actualStatePrevXs.indexOf(k) != -1) {
              if (actualState1PrevXs.indexOf(k) != -1) {
                key += "1";
              } else if (actualState2PrevXs.indexOf(k) != -1) {
                key += "2";
              } else {
                key += "0";
              }
            } else {
              key += "0";
            }
          }
          var cellState = GOL.rules.states[key];
          if (cellState > 0) {
            this.addCell(j, y, this.actualState);
            if (cellState == 1) {
              this.addCell(j, y, this.actualState1);
            } else if (cellState == 2) {
              this.addCell(j, y, this.actualState2);
            }
            this.redrawList.push([j, y, 1]);
          } else {
            this.redrawList.push([j, y, 0]);
          }
        }

        // Right boundary:
        key = "";
        var j;
        for (j = GOL.columns - 2; j < GOL.columns; j++) {
          if (actualStatePrevXs.indexOf(j) != -1) {
            if (actualState1PrevXs.indexOf(j) != -1) {
              key += "1";
            } else if (actualState2PrevXs.indexOf(j) != -1) {
              key += "2";
            } else {
              key += "0";
            }
          } else {
            key += "0";
          }
        }
        key += "0";
        var rightBoundaryState = GOL.rules.states[key];
        if (rightBoundaryState > 0) {
          this.addCell(GOL.columns - 1, y, this.actualState);
          if (rightBoundaryState == 1) {
            this.addCell(GOL.columns - 1, y, this.actualState1);
          } else if (rightBoundaryState == 2) {
            this.addCell(GOL.columns - 1, y, this.actualState2);
          }
          this.redrawList.push([GOL.columns - 1, y, 1]);
        } else {
          this.redrawList.push([GOL.columns - 1, y, 0]);
        }

        return this.getLiveCounts();
      },


      topPointer : 1,
      middlePointer : 1,
      bottomPointer : 1,

      getColorFromAlive : function(x, y) {
        var state1 = this.actualState1;
        var state2 = this.actualState2;

        var color1 = 0;
        var color2 = 0;

        var xm1 = (x-1);
        var xp1 = (x+1);

        var ym1 = (y-1);
        var yp1 = (y+1);

        // Periodic boundary conditions complicate any checks that end the loops early.
        var xstencilmin = Math.min(xm1, x, xp1);
        var xstencilmax = Math.max(xm1, x, xp1);

        var ystencilmin = Math.min(ym1, y, yp1);
        var ystencilmax = Math.max(ym1, y, yp1);

        // color1
        for (i = 0; i < state1.length; i++) {
          var yy = state1[i][0];

          if (yy >= ystencilmin) {

            if (yy === ym1) {
              // Top row
              for (j = 1; j < state1[i].length; j++) {
                var xx = state1[i][j];

                // Slight difference with periodic algorithm,
                // checking minimum of x values in the stencil
                if (xx >= xstencilmin) {

                  if (xx === xm1) {
                    // top left
                    color1++;
                  } else if (xx === x) {
                    // top middle
                    color1++;
                  } else if (xx === xp1) {
                    // top right
                    color1++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }

            } else if (yy === y) {
              // Middle row
              for (j = 1; j < state1[i].length; j++) {
                var xx = state1[i][j];
                if (xx >= xstencilmin) {
                  if (xx === xm1) {
                    // top left
                    color1++;
                  } else if (xx === xp1) {
                    // top right
                    color1++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }

            } else if (yy === yp1) {
              // Bottom row
              for (j = 1; j < state1[i].length; j++) {
                var xx = state1[i][j];
                if (xx >= xstencilmin) {
                  if (xx === xm1) {
                    // bottom left
                    color1++;
                  } else if (xx === x) {
                    // bottom middle
                    color1++;
                  } else if (xx === xp1) {
                    // bottom right
                    color1++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }
            }

          }
          if (yy >= ystencilmax) {
            break;
          }
        }

        // color2
        for (i = 0; i < state2.length; i++) {
          var yy = state2[i][0];

          if (yy >= ystencilmin) {

            if (yy === ym1) {
              // Top row
              for (j = 1; j < state2[i].length; j++) {
                var xx = state2[i][j];
                if (xx >= xstencilmin) {
                  if (xx === xm1) {
                    // top left
                    color2++;
                  } else if (xx === x) {
                    // top middle
                    color2++;
                  } else if (xx === xp1) {
                    // top right
                    color2++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }

            } else if (yy === y) {
              // Middle row
              for (j = 1; j < state2[i].length; j++) {
                var xx = state2[i][j];
                if (xx >= xstencilmin) {
                  if (xx === xm1) {
                    // left
                    color2++;
                  } else if (xx === xp1) {
                    // right
                    color2++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }

            } else if (yy === yp1) {
              // Bottom row
              for (j = 1; j < state2[i].length; j++) {
                var xx = state2[i][j];
                if (xx >= xstencilmin) {
                  if (xx === xm1) {
                    // bottom left
                    color2++;
                  } else if (xx === x) {
                    // bottom middle
                    color2++;
                  } else if (xx === xp1) {
                    // bottom right
                    color2++;
                  }
                }
                if (xx >= xstencilmax) {
                  break;
                }
              }
            }

          }
          if (yy >= ystencilmax) {
            break;
          }
        }

        if (color1 > color2) {
          return 1;
        } else if (color2 > color1) {
          return 2;
        } else {
          if (x%2==y%2) {
            return 1;
          } else {
            return 2;
          }
        }
      },

      /**
       *
       */
      getNeighborsFromAlive : function (x, y, i, state, possibleNeighborsList) {
        var xm1 = (x-1);
        var xp1 = (x+1);

        var ym1 = (y-1);
        var yp1 = (y+1);

        var xstencilmin = Math.min(xm1, x, xp1);
        var xstencilmax = Math.max(xm1, x, xp1);

        var ystencilmin = Math.min(ym1, y, yp1);
        var ystencilmax = Math.max(ym1, y, yp1);

        var neighbors = 0, k;
        var neighbors1 = 0, neighbors2 = 0;

        // Top
        if (state[i-1] !== undefined) {
          if (state[i-1][0] === ym1) {
            for (k = this.topPointer; k < state[i-1].length; k++) {

              if (state[i-1][k] >= xstencilmin ) {

                // NW
                if (state[i-1][k] === xm1) {
                  possibleNeighborsList[0] = undefined;
                  this.topPointer = k + 1;
                  neighbors++;
                  var xx = state[i-1][k];
                  var yy = state[i-1][0];
                  if (this.getCellColor(xx, yy) == 1) {
                    neighbors1++;
                  }
                  if (this.getCellColor(xx, yy) == 2) {
                    neighbors2++;
                  }
                }

                // N
                if (state[i-1][k] === x) {
                  possibleNeighborsList[1] = undefined;
                  this.topPointer = k;
                  neighbors++;
                  var xx = state[i-1][k];
                  var yy = state[i-1][0];
                  var cellcol = this.getCellColor(xx, yy);
                  if (cellcol == 1) {
                    neighbors1++;
                  } else if (cellcol == 2) {
                    neighbors2++;
                  }
                }

                // NE
                if (state[i-1][k] === xp1) {
                  possibleNeighborsList[2] = undefined;

                  if (k == 1) {
                    // why 1? why not 0? is this b/c offset-by-1 thing?
                    this.topPointer = 1;
                  } else {
                    this.topPointer = k - 1;
                  }

                  neighbors++;
                  var xx = state[i-1][k];
                  var yy = state[i-1][0];
                  var cellcol = this.getCellColor(xx, yy);
                  if (cellcol == 1) {
                    neighbors1++;
                  } else if (cellcol == 2) {
                    neighbors2++;
                  }
                }

                if (state[i-1][k] > xstencilmax) {
                  break;
                }
              }
            }
          }
        }

        // Middle
        for (k = 1; k < state[i].length; k++) {
          if (state[i][k] >= xstencilmin) {

            if (state[i][k] === xm1) {
              possibleNeighborsList[3] = undefined;
              neighbors++;
              var xx = state[i][k];
              var yy = state[i][0];
              var cellcol = this.getCellColor(xx, yy);
              if (cellcol == 1) {
                neighbors1++;
              } else if (cellcol == 2) {
                neighbors2++;
              }
            }

            if (state[i][k] === xp1) {
              possibleNeighborsList[4] = undefined;
              neighbors++;
              var xx = state[i][k];
              var yy = state[i][0];
              var cellcol = this.getCellColor(xx, yy);
              if (cellcol == 1) {
                neighbors1++;
              } else if (cellcol == 2) {
                neighbors2++;
              }
            }

            if (state[i][k] > xstencilmax) {
              break;
            }
          }
        }

        // Bottom
        if (state[i+1] !== undefined) {
          if (state[i+1][0] === yp1) {
            for (k = this.bottomPointer; k < state[i+1].length; k++) {
              if (state[i+1][k] >= xstencilmin) {

                if (state[i+1][k] === xm1) {
                  possibleNeighborsList[5] = undefined;
                  this.bottomPointer = k + 1;
                  neighbors++;
                  var xx = state[i+1][k];
                  var yy = state[i+1][0];
                  var cellcol = this.getCellColor(xx, yy);
                  if (cellcol == 1) {
                    neighbors1++;
                  } else if (cellcol == 2) {
                    neighbors2++;
                  }
                }

                if (state[i+1][k] === x) {
                  possibleNeighborsList[6] = undefined;
                  this.bottomPointer = k;
                  neighbors++;
                  var xx = state[i+1][k];
                  var yy = state[i+1][0];
                  var cellcol = this.getCellColor(xx, yy);
                  if (cellcol == 1) {
                    neighbors1++;
                  } else if (cellcol == 2) {
                    neighbors2++;
                  }
                }

                if (state[i+1][k] === xp1) {
                  possibleNeighborsList[7] = undefined;

                  if (k == 1) {
                    this.bottomPointer = 1;
                  } else {
                    this.bottomPointer = k - 1;
                  }

                  neighbors++;
                  var xx = state[i+1][k];
                  var yy = state[i+1][0];
                  var cellcol = this.getCellColor(xx, yy);
                  if (cellcol == 1) {
                    neighbors1++;
                  } else if (cellcol == 2) {
                    neighbors2++;
                  }
                }

                if (state[i+1][k] > xstencilmax) {
                  break;
                }
              }
            }
          }
        }

        var color;
        if (neighbors1 > neighbors2) {
          color = 1;
        } else if (neighbors2 > neighbors1) {
          color = 2;
        } else {
          if (x%2==y%2) {
            color = 1;
          } else {
            color = 2;
          }
        }

        //return neighbors;
        return {
          neighbors: neighbors,
          color: color
        }
      },


      /**
       * Check if the cell at location (x, y) is alive
       */
      isAlive : function(x, y) {
        var i, j;

        for (i = 0; i < this.actualState.length; i++) {
          // check that first coordinate in actualState matches
          if (this.actualState[i][0] === y) {
            for (j = 1; j < this.actualState[i].length; j++) {
              // check that second coordinate in actualState matches
              if (this.actualState[i][j] === x) {
                return true;
              }
            }
          }
        }
        return false;
      },

      /**
       * Get the color of the cell at location (x, y)
       */
      getCellColor : function(x, y) {

        for (i = 0; i < this.actualState1.length; i++) {
          if (this.actualState1[i][0] === y) {
            for (j = 1; j < this.actualState1[i].length; j++) {
              if (this.actualState1[i][j] === x) {
                return 1;
              }
            }
          }
        }
        for (i = 0; i < this.actualState2.length; i++) {
          if (this.actualState2[i][0] === y) {
            for (j = 1; j < this.actualState2[i].length; j++) {
              if (this.actualState2[i][j] === x) {
                return 2;
              }
            }
          }
        }
        return 0;
      },

      /**
       *
       */
      removeCell : function(x, y, state) {
        var i, j;

        for (i = 0; i < state.length; i++) {
          if (state[i][0] === y) {
            if (state[i].length === 2) { // Remove all Row
              state.splice(i, 1);
            } else { // Remove Element
              for (j = 1; j < state[i].length; j++) {
                if (state[i][j] === x) {
                  state[i].splice(j, 1);
                }
              }
            }
          }
        }
      },


      /**
       *
       */
      addCell : function(x, y, state) {
        if (state.length === 0) {
          state.push([y, x]);
          return;
        }

        var k, n, m, tempRow, newState = [], added;

        // figure out where in the list to insert the new cell
        if (y < state[0][0]) {
          // handle case of y < any other y, so add to beginning of list

          // set first element of newState and bump everybody else by 1
          newState = [[y,x]];
          for (k = 0; k < state.length; k++) {
            newState[k+1] = state[k];
          }

          // copy newState to state
          for (k = 0; k < newState.length; k++) {
            state[k] = newState[k];
          }

          return;

        } else if (y > state[state.length - 1][0]) {
          // handle case of y > any other y, so add to end
          state[state.length] = [y, x];
          return;

        } else { // Add to Middle

          for (n = 0; n < state.length; n++) {
            if (state[n][0] === y) { // Level Exists
              tempRow = [];
              added = false;
              for (m = 1; m < state[n].length; m++) {
                if ((!added) && (x < state[n][m])) {
                  tempRow.push(x);
                  added = !added;
                }
                tempRow.push(state[n][m]);
              }
              tempRow.unshift(y);
              if (!added) {
                tempRow.push(x);
              }
              state[n] = tempRow;
              return;
            }

            if (y < state[n][0]) { // Create Level
              newState = [];
              for (k = 0; k < state.length; k++) {
                if (k === n) {
                  newState[k] = [y,x];
                  newState[k+1] = state[k];
                } else if (k < n) {
                  newState[k] = state[k];
                } else if (k > n) {
                  newState[k+1] = state[k];
                }
              }

              for (k = 0; k < newState.length; k++) {
                state[k] = newState[k];
              }

              return;
            }
          }
        }
      }

    },


    /** ****************************************************************************************************************************
     *
     */
    helpers : {
      urlParameters : null, // Cache


      /**
       * Return a random integer from [min, max]
       */
      random : function(min, max) {
        return min <= max ? min + Math.round(Math.random() * (max - min)) : null;
      },


      /**
       * Get URL Parameters
       */
      getUrlParameter : function(name) {
        if (this.urlParameters === null) { // Cache miss
          var hash, hashes, i;

          this.urlParameters = [];
          hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

          for (i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            this.urlParameters.push(hash[0]);
            this.urlParameters[hash[0]] = hash[1];
          }
        }

        return this.urlParameters[name];
      },


      /**
       * Register Event
       */
      registerEvent : function (element, event, handler, capture) {
        if (/msie/i.test(navigator.userAgent)) {
          element.attachEvent('on' + event, handler);
        } else {
          element.addEventListener(event, handler, capture);
        }
      },


      /**
       *
       */
      mousePosition : function (e) {
        // http://www.malleus.de/FAQ/getImgMousePos.html
        // http://www.quirksmode.org/js/events_properties.html#position
        var event, x, y, domObject, posx = 0, posy = 0, top = 0, left = 0, cellSize = GOL.cellSize + 1;

        event = e;
        if (!event) {
          event = window.event;
        }

        if (event.pageX || event.pageY)     {
          posx = event.pageX;
          posy = event.pageY;
        } else if (event.clientX || event.clientY)  {
          posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }

        domObject = event.target || event.srcElement;

        while ( domObject.offsetParent ) {
          left += domObject.offsetLeft;
          top += domObject.offsetTop;
          domObject = domObject.offsetParent;
        }

        domObject.pageTop = top;
        domObject.pageLeft = left;

        x = Math.ceil(((posx - domObject.pageLeft)/cellSize) - 1);
        y = Math.ceil(((posy - domObject.pageTop)/cellSize) - 1);

        return [x, y];
      },

      getWaitTimeMs : function () {
        var j = 0;
        try {
          j = GOL.element.speedSlider.value;
        } catch {
          console.log("Could not read speed-slider value, using default value of 20 ms");
          return 200;
        }
        if (j<=0) {
          return 0;
        } else if (j==1) {
          return 8;
        } else if (j==2) {
          return 24;
        } else if (j==3) {
          return 60;
        } else if (j==4) {
          return 250;
        } else if (j==5) {
          return 1000;
        } else {
          return 1000;
        }
      }
    }

  };


  /**
   * Init on 'load' event
   */
  GOL.helpers.registerEvent(window, 'load', function () {
    GOL.init();
  }, false);

}());
