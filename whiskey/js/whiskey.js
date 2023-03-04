/*
(C) 2018 Klaus Llwynog.

This file is part of Whiskey.

Whiskey is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Whiskey is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Whiskey.  If not, see <http://www.gnu.org/licenses/>
*/

var features = [[ "cons",         "Consonantal", "0"],
                [ "syll",            "Syllabic", "0"],
                [  "son",            "Sonorant", "0"],
                [  "app",         "Approximant", "0"],
                ["voice",               "Voice", "0"],
                [   "sg",      "Spread Glottis", "0"],
                [   "cg", "Constricted Glottis", "0"],
                [ "cont",          "Continuant", "0"],
                [  "lat",             "Lateral", "0"],
                [  "del",     "Delayed Release", "0"],
                [  "nas",               "Nasal", "0"],
                [  "lab",              "Labial", "0"],
                [  "rnd",               "Round", "0"],
                [  "cor",             "Coronal", "0"],
                [  "ant",            "Anterior", "0"],
                [ "dist",         "Distributed", "0"],
                [  "str",            "Strident", "0"],
                [ "dors",              "Dorsal", "0"],
                [ "high",                "High", "0"],
                [  "low",                 "Low", "0"],
                ["front",               "Front", "0"],
                [ "back",                "Back", "0"],
                [  "atr",    "Adv. Tongue Root", "0"]];//length == 23

var DEFAULT_FEATURES_LENGTH = 23;

//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi Lo Fr Ba AT
var segments = [["wbp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// p
                ["vbp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// b
                ["wdp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// tD
                ["vdp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// dD
                ["wap", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// t
                ["vap", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// d
                ["wqp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// tS
                ["vqp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// dS
                ["wrp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// tr
                ["vrp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// dr
                ["wpp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// c
                ["vpp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// j
                ["wvp", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// k
                ["vvp", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// g
                ["wup", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// q
                ["vup", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// G
                ["wgp", 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],// ?
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wbn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// mh
                ["vbn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// m
                ["wln", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// mfh
                ["vln", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// mf
                ["wdn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// nDh
                ["vdn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// nD
                ["wan", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// nh
                ["van", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// n
                ["wqn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// nSh
                ["vqn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// nS
                ["wrn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// nrh
                ["vrn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// nr
                ["wpn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// njh
                ["vpn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// nj
                ["wvn", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// ngh
                ["vvn", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// ng
                ["wun", 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// Nh
                ["vun", 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// N
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wbr", 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// Bh
                ["vbr", 2, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// B
                ["war", 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// rh
                ["var", 2, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// r
                ["wur", 2, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// Rh
                ["vur", 2, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// R
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wlt", 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// vh
                ["vlt", 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// v
                ["wat", 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// rh
                ["vat", 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// r
                ["wrt", 2, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// rRh
                ["vrt", 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// rR
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An St Di Do Hi L1 Fr Ba AT
                ["wbf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// B
                ["vbf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// P
                ["wlf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 2, 0, 1, 1, 1, 1, 1],// f
                ["vlf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 2, 0, 0, 1, 0, 2, 0, 1, 1, 1, 1, 1],// v
                ["wdf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// th
                ["vdf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// dh
                ["waf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 0, 2, 0, 1, 1, 1, 1, 1],// s
                ["vaf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 2, 0, 2, 0, 1, 1, 1, 1, 1],// z
                ["wrf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1],// sr
                ["vrf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1],// zr
                ["wqf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 1, 1, 1, 1, 1],// S
                ["vqf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 1, 1, 1, 1, 1],// Z
                ["wpf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// ch
                ["vpf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// jh
                ["wvf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// x
                ["vvf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// G
                ["wuf", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// X
                ["vuf", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// R
                ["wff", 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 2, 1],// h
                ["vff", 2, 0, 0, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 2, 1],// ?
                ["wgf", 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],// h
                ["vgf", 0, 0, 0, 0, 2, 2, 0, 2, 0, 2, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],// H
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An St Di Do Hi L1 Fr Ba AT
                ["waz", 2, 0, 0, 0, 0, 2, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// ll
                ["vaz", 2, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// dl
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wla", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// vwh
                ["vla", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1],// vw
                ["waa", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// rwh
                ["vaa", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// rw
                ["wra", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// rrh
                ["vra", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// rr
                ["wpa", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// jh
                ["vpa", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// j
                ["wva", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// gwh
                ["vva", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// gw
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An St Di Do Hi L1 Fr Ba AT
                ["wal", 2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// lh
                ["val", 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// l
                ["wrl", 2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// lrh
                ["vrl", 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// lr
                ["wpl", 2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// ljh
                ["vpl", 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// lj
                ["wvl", 2, 0, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// lgh
                ["vvl", 2, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// lg
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An St Di Do Hi L1 Fr Ba AT
                ["wpz", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// wjh
                ["vpz", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// wj
                ["wvz", 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// hw
                ["vvz", 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// w
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An St Di Do Hi L1 Fr Ba AT
                ["wb2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// pF
                ["vb2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// bV
                ["wl2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 2, 0, 1, 1, 1, 1, 1],// pf
                ["vl2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 0, 2, 0, 1, 1, 1, 1, 1],// bv
                ["wd2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// tTh
                ["vd2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// dDh
                ["wa2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 0, 1, 1, 1, 1, 1],// ts
                ["va2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 0, 2, 0, 1, 1, 1, 1, 1],// dz
                ["wq2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 1, 1, 1, 1, 1],// tS
                ["vq2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 2, 2, 0, 1, 1, 1, 1, 1],// dZ
                ["wr2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1],// trS
                ["vr2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 2, 0, 1, 1, 1, 1, 1],// drZ
                ["wp2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// cC
                ["vp2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// jJ
                ["wv2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// kx
                ["vv2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// gG
                ["wu2", 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// qX
                ["vu2", 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// gR
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wbc", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 2, 2, 0, 0, 2, 1],// p
                ["vbc", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 2, 2, 0, 0, 2, 1],// b
                ["wdc", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 1],// tD
                ["vdc", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 0, 0, 2, 1],// dD
                ["wac", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 1],// t
                ["vac", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 0, 0, 2, 1],// d
                ["wqc", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0, 0, 2, 1],// tS
                ["vqc", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2, 2, 0, 0, 2, 1],// dS
                ["wpc", 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 2, 1],// c
                ["vpc", 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 2, 1],// j
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wbi", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// p
                ["vbi", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// b
                ["wai", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// t
                ["vai", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// d
                ["wpi", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// c
                ["vpi", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// j
                ["wvi", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// k
                ["vvi", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// g
                ["wui", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// q
                ["vui", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// G
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
                ["wbe", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// p
                ["vbe", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 1, 1, 1, 1, 1],// b
                ["wde", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// tD
                ["vde", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 1, 1, 1, 1, 1],// dD
                ["wae", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// t
                ["vae", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 1, 1, 1, 1, 1],// d
                ["wqe", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// tS
                ["vqe", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 1, 1, 1, 1, 1],// dS
                ["wre", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// tr
                ["vre", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 1, 1, 1],// dr
                ["wpe", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// c
                ["vpe", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 1],// j
                ["wve", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// k
                ["vve", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 1],// g
                ["wue", 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// q
                ["vue", 2, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 1],// G
//                     Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
               ["v000", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 2],// i
               ["v001", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 0, 2],// y
               ["v020", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 0, 2],//  
               ["v021", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 0, 0, 2],//  
               ["v040", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 0, 2, 2],// w
               ["v041", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 0, 2, 2],// u
               ["v110", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 2, 0, 2, 0, 0],// i
               ["v111", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 2, 0, 0],// y
               ["v131", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 2, 0, 0, 2, 0],// u
               ["v200", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 2, 0, 2],// e
               ["v201", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 2, 0, 2],// oe
               ["v220", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 2],//  
               ["v221", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 0, 0, 2],//  
               ["v240", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 2],// v
               ["v241", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 0, 2, 2],// o
               ["v320", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],// @
               ["v400", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 2, 0, 0],// E
               ["v401", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 2, 0, 0],// oe
               ["v420", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],//  
               ["v421", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0],//  
               ["v440", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 0],// ^
               ["v441", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 0, 0, 2, 0],//  
               ["v510", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 2, 0, 2],// ae
               ["v520", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 0, 2],//  
//             ["v620", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 2, 0, 0],// a NOTE: this is the front vowel version
               ["v620", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 0, 0],// a NOTE: this is the central vowel version
               ["v621", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 2, 0, 0, 0],// OE
               ["v640", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 2, 0, 2, 0],//  
               ["v641", 0, 2, 2, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 0, 1, 1, 0, 2, 0, 2, 0, 2, 0] //  
              ];

//                         Co Sy So Ap Vo SG CG Cn La DR Na Lb Rd Co An Di St Do Hi L1 Fr Ba AT
var natCls = [[  "plosive", 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [    "nasal", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [    "trill", 2, 0, 2, 2, 1, 1, 1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [     "flap", 1, 0, 2, 2, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              ["fricative", 1, 0, 0, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [  "latfric", 1, 0, 0, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [   "approx", 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              ["latapprox", 1, 0, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              ["labapprox", 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              ["affricate", 1, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                  ["click", 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 2, 1],
              ["implosive", 1, 0, 0, 1, 1, 1, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
               ["ejective", 1, 0, 0, 1, 1, 1, 2, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              ["lablabial", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1],
              ["labdental", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
              [   "dental", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
              [ "alveolar", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 0, 1, 1, 1, 1, 1, 1, 1],
              ["palveolar", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 2, 1, 1, 1, 1, 1, 1, 1],
              ["retroflex", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1],
              [  "palatal", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1],
              [    "velar", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 0, 1, 1],
              [   "uvular", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 1, 1, 1],
              [  "pharynx", 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1],
              [  "glottal", 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
              [    "front", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
              [   "nfront", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
              [  "central", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
              [    "nback", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
              [     "back", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
              [     "high", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
              [    "nhigh", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
              [    "mhigh", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
              [      "mid", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
              [     "mlow", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
              [     "nlow", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
              [      "low", 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
             ];

var enPhonemes = ["wbp", "vbp",                             "wap", "vap",                             "wvp", "vvp",
                         "vbn",                                    "van",                                    "vvn",

                                "wlf", "vlf", "wdf", "vdf", "waf", "vaf", "wqf", "vqf",                             "wgf",
                                                            "vaa",                             "vpa",
                                                                   "val",
                                                                                                             "vvz",
                                                                          "wq2", "vq2",

                  "v000",                                                                 "v041",
                                  "v110",                                 "v131",
                  "v200",                                                                 "v241",
                                                  "v320",
                  "v400",                                         "v430",         "v440", "v441",
                                  "v510",
                                                  "v620",                         "v640", "v641"
                ];

var laPhonemes = ["wbp",                                    "wap",                                    "wvp",       
                         "vbn",                                    "van",                      "vpn",        "vvn",

                                "wlf",                      "waf",        "wqf",                                          
                                                                                                     
                                                                   "val",
                                                                                                             "vvz",
                                                                          "wq2",       

                  "v000",                                                                 "v041",
                                                                                 
                  "v200",                                                                 "v241",
                                                         
                                                                                                 
                                         
                                                  "v620",                                       
                ];

var soPhonemes = ["wbp", "vbp",                             "wap", "vap",                "wrp", "vrp", "wvp", "vvp",
                         "vbn",                                    "van",                              "vpn", "vvn",            
"var",
                         "vbf", "wlf",               "vdf", "waf",                              "vrf",        "vvf",                               "vff",        "vgf",
                                                                                                     
                                                                   "val",
                                                                                                              "vvz",
                                                                                 

                  "v000",                                                                 "v041",
                                                                                 
                  "v200",                                                                 "v241",
                                                         
                                                                                                 
                                         
                                                  "v640",                                       
                ];

var trPhonemes = ["wbp", "vbp", "wap", "vap", "waf", "vaf", "wq2", "vq2", "wvp", "vvp",
                  "vbn", "van", "val", "var", "vpa",
                  "v000", "v001", "v040", "v041", "v200", "v201", "v620", "v241", 
                  ];

var caPhonemes = ["wbp", "vbp", "wap", "vap", "wvp", "vvp",
                  "vbf", "wlf", "vdf", "waf", "vaf", "wqf", "vqf", "vvf",
                  "wq2", "vq2", "vbn", "van", "vat", "var", "val", "vpl",
                  "v000", "v041", "v200", "v241", "v400", "v441", "v320", "v620",
];

var poPhonemes = ["wbp", "vbp", "wap", "vap", "wvp", "vvp",
                  "wlf", "vlf", "waf", "vaf", "wqf", "vqf", "wgf",
                  "wa2", "wq2", "vbn", "van", "vpn", "vat", "val", "vvz", "vpa",
                  "v000", "v020", "v041", "v200", "v241", "v620",
];


var hidehiro = false;
var engOn = false;
var lambaOn = false;
var somaliOn = false;
var turkishOn = false;
var catalanOn = false;
var polishOn = false;
var lastPhone = "";
var lastCl = "";
var gentlemen = ["Active", "Cheerful", "Creative", "Genius", "Gloomy", "Goofball", "Hot-headed", "Romantic", "Self-assured", "Unflirty", "Pretentious", "Bookworm", "Foodie", "Geek", "Relaxed", "Perfectionist", "Ambitious", "Catlover", "Childish", "Clumsy", "Flexible", "Deviant", "Glutton", "Insane", "Kleptomaniac", "Lazy", "Materialistic", "Neat", "Slob", "Squeamish", "Vegetarian", "Bro", "Evil", "Family-oriented", "Good", "Boring", "Insider", "Jealous", "Loner", "Mean", "Noncommittal", "Outgoing", "Primal", "Hungry", "Muser", "Dastardly", "Domestic", "Business-savvy", "Quick Learner", "Homesick", "Alluring", "Collector", "Gregarious"];
var featureBoxText = "";
var khoa = 0;

function init() {
  for (var i = 0; i < natCls.length; i++) {
    for (var j = 0; j < natCls[i].length; j++) {
      switch (natCls[i][j]) {
        case 0:
          natCls[i][j] = "m";
          break;
        case 1:
          natCls[i][j] = "0";
          break;
        case 2:
          natCls[i][j] = "p";
          break;
        case 3:
          natCls[i][j] = "b";
          break;
      }
    }
  }for (var i = 0; i < segments.length; i++) {
    for (var j = 0; j < segments[i].length; j++) {
      switch (segments[i][j]) {
        case 0:
          segments[i][j] = "m";
          break;
        case 1:
          segments[i][j] = "0";
          break;
        case 2:
          segments[i][j] = "p";
          break;
        case 3:
          segments[i][j] = "b";
          break;
      }
    }
  }

  var symbols = document.getElementsByClassName("symbol");
  for (var symbol of symbols) {
    symbol.addEventListener('click', function(evt) { flipPhone(evt); });
  }

  var natcls = document.getElementsByClassName("natcl");
  for (var natcl of natcls) {
    natcl.addEventListener('click', function(evt) { flipNatcl(evt); });
  }

  document.getElementById("hide").checked = false;

  if (navigator.userAgent.match(/Mobile/)) {
    document.getElementById("mobile-h2").innerHTML = "";
    document.getElementById("mobile-sg").innerHTML = "S. Glottis";
    document.getElementById("mobile-cg").innerHTML = "C. Glottis";
  }

  update();
}

function flipPhone(evt) {
  if (lastPhone === evt.target.id) {
    reset();
  } else {
    lastPhone = evt.target.id;
    var segID = -1;
    var segValue;
    
    for (var i = 0; i < segments.length; i++) {
      if (segments[i][0] === lastPhone) {
        segID = i;
        break;
      }
    }

    for (var i = 0; i < features.length; i++) {
      segValue = segments[segID][i + 1];
      if (segValue === "b") {
        segValue = "0";
      }

      features[i][2] = segValue;
      document.getElementById(features[i][0] + "-" + segValue).checked = true;
    }

    update();
  }
}

function flipNatcl(evt) {
  if (lastCl === evt.target.id) {
    reset();
  } else {
    lastCl = evt.target.id;
    var natClID = -1;
    var natClValue;

    for (var i = 0; i < natCls.length; i++) {
      if (natCls[i][0] === evt.target.id) {
        natClID = i;
        break;
      }
    }

    for (var i = 0; i < features.length; i++) {
      natClValue = natCls[natClID][i + 1];
      if (natClValue === "b") {
        natClValue = "0";
      }

      features[i][2] = natClValue;
      console.log(features[i][0] + " " + features[i][2]);
      document.getElementById(features[i][0] + "-" + features[i][2]).checked = true;
    }

    update();
  }
}

function update() {
  var groups = document.getElementsByClassName("group");
  var output = [];

  for (var i = 0; i < features.length; i++) {
    var value = document.querySelector("input[name = " + features[i][0] + "]:checked").value;
    var fuckvalue = value[value.length - 1];

    features[i][2] = value;

    var name = groups[i].className.split(" ")[1];
    switch (fuckvalue) {
      case "m":
        groups[i].style.background = "#ffd0d0";
        break;
      case "0":
        groups[i].style.background = "#ffffff";
        break;
      case "p":
        groups[i].style.background = "#d0d0ff";
        break;
      default:
        console.log("Nawww...");
    }
  }

  for (var i = 0; i < features.length; i++) {
    console.log(features[i][2]);
    if (features[i][2] == "m") {
      output.push("<span class = \"minus\">&minus; " + features[i][1] + "</span>");
    } else if (features[i][2] == "p") {
      output.push("<span class = \"plus\">&plus; " + features[i][1] + "</span>");
    } else if ((!hidehiro) && (features[i][2] == "0")) {
      output.push("<span class = \"plusmn\">&plusmn; " + features[i][1] + "</span>");
    }
  }

  if (features.length > DEFAULT_FEATURES_LENGTH) {
//    updateCustomFeatures();
  }

  showBox(output);
  showChart();
}

function updateCustomFeatures() {
  var checked = " checked = \"checked\"";
  var featureID;
  var featureName;
  var featureBG;
  var featureBox = document.getElementById("custom-feature");
  featureBox.innerHTML = "";
  for (var i = DEFAULT_FEATURES_LENGTH; i < features.length; i++) {
    console.log("naww");
    featureID = features[i][0];
    featureName = features[i][1];

    switch (features[i][2]) {
      case "m":
        featureBG = "#ffd0d0";
        break;
      case "0":
        featureBG = "#ffffff";
        break;
      case "p":
        featureBG = "#d0d0ff";
        break;
      default:
        console.log("Nawww...");
    }

    featureBox.innerHTML += "          <div class = \"group " + featureID + "\" style = \"background: " + featureBG + ";\">" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-m\" value = \"m\" onclick = \"update()\"" + (features[i][2] === "m" ? checked : "") + "><label for = " + featureID + "-m\">&minus;</label>" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-0\" value = \"0\" onclick = \"update()\"" + (features[i][2] === "0" ? checked : "") + "><label for = " + featureID + "-0\">&plusmn;</label>" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-p\" value = \"p\" onclick = \"update()\"" + (features[i][2] === "p" ? checked : "") + "><label for = " + featureID + "-p\">&plus;</label>" +
                    "          </div>" +
                    "          <span class = \"feature\"><input id = \"textbox-" + i + "\" type = \"text\" value = " + featureName + " onchange = \"updateFeatureName(\'" + (i) + "\')\"/></span>";
  }
}

function updateFeatureName(index) {
  features[index][1] = document.getElementById("textbox-" + index).value;
  update();
}

function showBox(output) {
  box = document.getElementById("little-box");
  box.innerHTML = "<p>";

  if (output.length > 0) {
    for (var i = 0; i < output.length; i++) {
      box.innerHTML += output[i] + "<br />";
    }
  } else {
    box.innerHTML += "<span class = \"plusmn\">&plusmn; All</span>";
  }

  box.innerHTML += "</p>";
}

function showChart() {
  for (var i = 0; i < segments.length; i++) {
    var seg = document.getElementById(segments[i][0]);

    seg.style.visibility = "visible";
    seg.style.color = "black";
    seg.parentElement.style.background = "#fbfbf4";
  }


  for (var i = 0; i < segments.length; i++) {
    for (var j = 0; j < features.length; j++) {
      var seg = document.getElementById(segments[i][0]);
      if (engOn && enPhonemes.indexOf(segments[i][0]) == -1) { //if not english
        seg.style.visibility = "hidden";
      } else if (catalanOn && caPhonemes.indexOf(segments[i][0]) == -1) { //if not catalan
        seg.style.visibility = "hidden";
      } else if (polishOn && poPhonemes.indexOf(segments[i][0]) == -1) { //if not polish
        seg.style.visibility = "hidden";
      } else if (turkishOn && trPhonemes.indexOf(segments[i][0]) == -1) { //if not turkish
        seg.style.visibility = "hidden";
      } else if (somaliOn && soPhonemes.indexOf(segments[i][0]) == -1) { //if not somali
        seg.style.visibility = "hidden";
      } else if (lambaOn && laPhonemes.indexOf(segments[i][0]) == -1) { //if not lamba
        seg.style.visibility = "hidden";
      } else if (!(features[j][2] === "0")) {
        if ((features[j][2] === "m") && (segments[i][j + 1] === "0")) { //true but not applicable
          seg.style.color = "#c0c0c0";
        } else if (!(segments[i][j + 1] === "b")) { //false
          if (!(features[j][2] === segments[i][j + 1])) {
            seg.style.color = "#c0c0c0";
            seg.parentElement.style.background = "#f0f0f7";
          }
        }
      }
    }
  }

  for (var i = 0; i < segments.length; i++) {
    var seg = document.getElementById(segments[i][0]);

    if (seg.style.color == "black") {
      seg.parentElement.style.background = "#fbfbf4";
    }
  }

  //flip rows and columns
//  for (var i = 0; i < natCls.length; i++) {
//    var natCl = document.getElementById(natCls[i][0]);
//
//    for (var j = 0; j < segments.length; j++) {
//      switch (natCl) {
//        case "plosive":
//          console.log(segments[j][0].charAt(2));
//          if (segments[j][0].charAt(2) === "p" && document.getElementById([segments[i][0]).parentElement.style.background = "#fbfbf4") {
//            seg.parent
//  }
}

function reset() {
  lastPhone = "";
  lastCl = "";
  console.log(features.length);
  for (var i = 0; i < DEFAULT_FEATURES_LENGTH; i++) {
    features[i][2] = "0";
    document.getElementById(features[i][0] + "-0").checked = true;
  }

  if (features.length > DEFAULT_FEATURES_LENGTH) {
    resetCustomFeatures();
  }

  update();
}

function resetCustomFeatures() {
  var featureID;
  var featureName;
  var featureBox = document.getElementById("custom-feature");
  featureBox.innerHTML = "";
  for (var i = DEFAULT_FEATURES_LENGTH; i < features.length; i++) {
    console.log("naww");
    featureID = features[i][0];
    featureName = features[i][1];
    featureBox.innerHTML += "          <div class = \"group " + featureID + "\">" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-m\" value = \"m\" onclick = \"update()\"><label for = " + featureID + "-m\">&minus;</label>" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-0\" value = \"0\" onclick = \"update()\" checked = \"checked\"><label for = " + featureID + "-0\">&plusmn;</label>" +
                    "            <input type = \"radio\" name = " + featureID + " id = " + featureID + "-p\" value = \"p\" onclick = \"update()\"><label for = " + featureID + "-p\">&plus;</label>" +
                    "          </div>" +
                    "          <span class = \"feature\"><input type = \"text\" value = " + featureName + " onchange = \"updateFeatureName(" + featureID + ");\"/></span>";
  }
}


function hide() {
  hidehiro = document.getElementById("hide").checked;

  update();
}

function limit() {
  console.log(document.getElementById("limit").value);
}

function english() {
  engOn = document.getElementById("english").checked;

  update();
}

function catalan() {
  catalanOn = document.getElementById("catalan").checked;

  update();
}

function polish() {
  polishOn = document.getElementById("polish").checked;

  update();
}

function turkish() {
  turkishOn = document.getElementById("turkish").checked;

  update();
}

function somali() {
  somaliOn = document.getElementById("somali").checked;

  update();
}

function lamba() {
  lambaOn = document.getElementById("lamba").checked;

  update();
}

function disperse(bros) {
  return bros[Math.floor(Math.random() * bros.length)];
}

function addFeatureToInventory(featureName, featureID) {
  features.push([featureID, featureName, "0"]);

  for (var i = 0; i < segments.length; i++) {
    segments[i].push("0");
  }

  console.log(features);
}

function addFeature() {
  if (khoa == 0) {
    document.getElementById("custom-feature").innerHTML = "";
  }

  khoa += 1;

  var featureName = disperse(gentlemen);
  var featureID = "khoa" + khoa;
  addFeatureToInventory(featureName, featureID);
  updateCustomFeatures();
  update();
}

init();
