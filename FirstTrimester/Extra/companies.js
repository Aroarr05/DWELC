let companies = [
    {
        "continent": "Africa",
        "countries": [{
            "name": "Egypt",
            "companies":
                [
                    {"Air Arabia Egypt": {"IATA": "E5", "ICAO": "RGB"}},
                    {"Air Leisure": {"IATA": "AL", "ICAO": "ALD"}},
                    {"Aviator Airlines": {"IATA": "T9", "ICAO": "AVV"}},
                    {"Air Arabia Egypt": {"IATA": "E5", "ICAO": "RGB"}}
                ]
        },
            {
                "name": "Kenya",
                "companies":
                    [
                        {"Air Peace": {"IATA": "APK", "ICAO": "A4"}},
                        {"Forty Five Aviation": {"IATA": "FFV", "ICAO": "5H"}}
                    ]
            },
            {
                "name": "Morocco",
                "companies":
                    [
                        {"Air Arabia Maroc": {"IATA": "MAC", "ICAO": "30"}}
                    ]
            },
            {
                "name": "South Africa",
                "companies":

                    [
                        {"Kulula": {"IATA": "CAW", "ICAO": "MN"}},
                        {"Mango Airlines": {"IATA": "MNO", "ICAO": "JE"}},
                        {"Namibia Flyafrica": {"IATA": "NMD", "ICAO": "N6"}},
                        {"Safair": {"IATA": "SFR", "ICAO": "FA"}}
                    ]
            },
            {
                "name": "Tanzania",
                "companies":
                    [
                        {"Fastjet": {"IATA": "FTZ", "ICAO": "FN"}}
                    ]
            }
        ],
    },
    {
        "continent": "Asia and the Pacific",
        "countries":
            [
                {
                    "name": "Australia",
                    "companies":
                        [
                            {"Jetstar": {"IATA": "JJP", "ICAO": "JQ"}},
                            {"Virgin Australia": {"IATA": "VOZ", "ICAO": "VA"}}
                        ]
                },
                {
                    "name": "China",
                    "companies":
                        [
                            {"9Air": {"IATA": "JYH", "ICAO": "AQ"}},
                            {"Chengdu Airlines": {"IATA": "UEA", "ICAO": "EU"}},
                            {"China West Air": {"IATA": "CHB", "ICAO": "PN"}},
                            {"Hong Kong Express Airways": {"IATA": "HKE", "ICAO": "UO"}},
                            {"Lucky Air": {"IATA": "LKE", "ICAO": "8L"}},
                            {"Ruili Airlines": {"IATA": "RLH", "ICAO": "DR"}},
                            {"Spring Airlines": {"IATA": "CQH", "ICAO": "9C"}}
                        ]
                },
                {
                    "name": "India",
                    "companies":
                        [
                            {"Air Asia India": {"IATA": "IAD", "ICAO": "I5"}},
                            {"Air India Express": {"IATA": "AXB", "ICAO": "IX"}},
                            {"GoAir": {"IATA": "GOW", "ICAO": "G8"}},
                            {"IndiGo": {"IATA": "IGO", "ICAO": "6E"}},
                            {"JetKonnect": {"IATA": "JLL", "ICAO": "S2"}},
                            {"Spice Jet": {"IATA": "SEJ", "ICAO": "SG"}},
                            {"TruJet": {"IATA": "TRJ", "ICAO": "2T"}}
                        ]
                },
                {
                    "name": "Indonesia",
                    "companies":
                        [
                            {"Citylink": {"IATA": "CTV", "ICAO": "QG"}},
                            {"Indonesia Air Asia": {"IATA": "AWQ", "ICAO": "QZ"}},
                            {"Lion Air": {"IATA": "LNI", "ICAO": "JT"}},
                            {"Wings Air": {"IATA": "WON", "ICAO": "IW"}}
                        ]
                },
                {
                    "name": "Japan",
                    "companies":
                        [
                            {"Air Do": {"IATA": "ADA", "ICAO": "HD"}},
                            {"Jetstar Japan": {"IATA": "JJP", "ICAO": "GK"}},
                            {"Peach Aviation": {"IATA": "APJ", "ICAO": "MM"}},
                            {"Skymark Airlines": {"IATA": "SKY", "ICAO": "BC"}},
                            {"Solaseed Air": {"IATA": "SNJ", "ICAO": "LQ"}},
                            {"Spring Airlines Japan": {"IATA": "SJO", "ICAO": "IJ"}},
                            {"StarFlyer": {"IATA": "SFJ", "ICAO": "7G"}},
                            {"Vanilla Air": {"IATA": "VNL", "ICAO": "JW"}}
                        ]
                },
                {
                    "name": "Kyrgyzstan",
                    "companies":
                        [
                            {"Air Manas": {"IATA": "MMB", "ICAO": "ZM"}}
                        ]
                },
                {
                    "name": "Malaysia",
                    "companies":
                        [
                            {"Air Asia": {"IATA": "AXM", "ICAO": "AK"}},
                            {"Air Asia X": {"IATA": "XAX", "ICAO": "D7"}},
                            {"Malindo Air": {"IATA": "MXD", "ICAO": "OD"}}
                        ]
                },

                {
                    "name":
                        "Pakistan",
                    "companies":
                        [
                            {"Air Blue": {"IATA": "ABQ", "ICAO": "PA"}}
                        ]
                }
                ,
                {
                    "name":
                        "Philippines",
                    "companies":
                        [
                            {"Cebgo": {"IATA": "SRQ", "ICAO": "DG"}},
                            {"Cebu Pacific Air": {"IATA": "CEB", "ICAO": "5J"}},
                            {"PAL Express": {"IATA": "GAP", "ICAO": "2P"}},
                            {"Philippines Air Asia": {"IATA": "APG", "ICAO": "PQ"}},
                            {"SEAir International": {"IATA": "SGD", "ICAO": "XO"}}
                        ]
                }
                ,
                {
                    "name":
                        "Republic of Korea",
                    "companies":
                        [
                            {"Air Busan": {"IATA": "ABL", "ICAO": "BX"}},
                            {"Air Seoul": {"IATA": "ASV", "ICAO": "RS"}},
                            {"Eastar Jet": {"IATA": "ESR", "ICAO": "ZE"}},
                            {"Jeju Air": {"IATA": "JJA", "ICAO": "7C"}},
                            {"Jin Air": {"IATA": "JNA", "ICAO": "LJ"}},
                            {"T'way Airlines": {"IATA": "TWB", "ICAO": "TW"}}
                        ]
                }
                ,
                {
                    "name":
                        "Samoa",
                    "companies":

                        [
                            {"Virgin Samoa": {"IATA": "PBN", "ICAO": "DJ"}}
                        ]
                }
                ,
                {
                    "name":
                        "Singapore",
                    "companies":
                        [
                            {"Jetstar Asia Airways": {"IATA": "JSA", "ICAO": "3K"}},
                            {"Scoot": {"IATA": "SCO", "ICAO": "TZ"}},
                            {"Tigerair Singapore": {"IATA": "TGW", "ICAO": "TR"}}
                        ]
                }
                ,
                {
                    "name":
                        "Taiwan",
                    "companies":
                        [
                            {"Tigerair Taiwan": {"IATA": "TTW", "ICAO": "IT"}}
                        ]
                }
                ,
                {
                    "name":
                        "Thailand",
                    "companies":
                        [
                            {"Nok Air": {"IATA": "NOK", "ICAO": "DD"}},
                            {"NokScoot Airlines": {"IATA": "NCT", "ICAO": "XW"}},
                            {"Thai AirAsia": {"IATA": "AIQ", "ICAO": "FD"}},
                            {"Thai AirAsia X": {"IATA": "TAX", "ICAO": "XJ"}},
                            {"Thai Lion Air": {"IATA": "TLM", "ICAO": "SL"}},
                            {"Thai VietJet Air": {"IATA": "TVJ", "ICAO": "VZ"}}
                        ]
                }
                ,
                {
                    "name":
                        "Vietnam",
                    "companies":
                        [
                            {"Jetstar Pacific Airlines": {"IATA": "PIC", "ICAO": "BL"}}
                        ]
                }
            ],
    },
    {
        "continent":
            "Europe",
        "countries":
            [
                {
                    "name": "Albania",
                    "companies":

                        [
                            {"Albawings": {"IATA": "AWT", "ICAO": "2B"}}
                        ]
                },
                {
                    "name":
                        "Austria",
                    "companies":

                        [
                            {"Eurowings Europe": {"IATA": "EWE", "ICAO": "E2"}},
                            {"Niki": {"IATA": "NLY", "ICAO": "HG"}}
                        ]
                }
                ,
                {
                    "name":
                        "Belgium",
                    "companies":
                        [
                            {"TUI fly Belgium": {"IATA": "JAF", "ICAO": "X3"}}
                        ]
                }
                ,
                {
                    "name":
                        "Cyprus",
                    "companies":
                        [
                            {"Colabt Aero": {"IATA": "FCB", "ICAO": "CO"}}
                        ]
                }
                ,
                {
                    "name":
                        "Czech Republic",
                    "companies":
                        [
                            {"SmartWings": {"IATA": "TVS", "ICAO": "QS"}}
                        ]
                }
                ,
                {
                    "name":
                        "France",
                    "companies":

                        [
                            {"Transavia France": {"IATA": "TVF", "ICAO": "TO"}}
                        ]
                }
                ,
                {
                    "name":
                        "Germany",
                    "companies":
                        [
                            {"Condor Flugdienst": {"IATA": "CFG", "ICAO": "DE"}},
                            {"Eurowings": {"IATA": "EWG", "ICAO": "EW"}},
                            {"Germanwings": {"IATA": "GUI", "ICAO": "4U"}},
                            {"SunExpress Deutschland": {"IATA": "SXD", "ICAO": "XG"}},
                            {"TUIFly": {"IATA": "TUI", "ICAO": "X3"}}
                        ]
                }
                ,
                {
                    "name":
                        "Hungary",
                    "companies":
                        [
                            {"Wizz Air": {"IATA": "WZZ", "ICAO": "W6"}}
                        ]
                }
                ,
                {
                    "name":
                        "Iceland",
                    "companies":

                        [
                            {"WOW Air": {"IATA": "WOW", "ICAO": "WW"}}
                        ]
                }
                ,
                {
                    "name":
                        "Ireland",
                    "companies":
                        [
                            {"Ryanair": {"IATA": "RYR", "ICAO": "FR"}}
                        ]
                }
                ,
                {
                    "name":
                        "Italy",
                    "companies":

                        [
                            {"Blue Panorama": {"IATA": "BPA", "ICAO": "BV"}},
                            {"Meridiana": {"IATA": "ISS", "ICAO": "IG"}}
                        ]
                }
                ,
                {
                    "name":
                        "Netherlands",
                    "companies":

                        [
                            {"Transavia.com": {"IATA": "TRA", "ICAO": "HV"}}
                        ]
                }
                ,
                {
                    "name":
                        "Norway",
                    "companies":
                        [
                            {"Norwegian Air Shuttle": {"IATA": "NAX", "ICAO": "DY"}}
                        ]
                }
                ,
                {
                    "name":
                        "Portugal",
                    "companies":
                        [
                            {"Hifly": {"IATA": "HFY", "ICAO": "5K"}}
                        ]
                }

                ,
                {
                    "name":
                        "Spain",
                    "companies":

                        [
                            {"Volotea": {"IATA": "VOE", "ICAO": "V7"}},
                            {"Vueling": {"IATA": "VLG", "ICAO": "VY"}}
                        ]
                }
                ,

                {
                    "name":
                        "United Kingdom",
                    "companies":
                        [
                            {"easyJet": {"IATA": "EZY", "ICAO": "U2"}},
                            {"Flybe": {"IATA": "BEE", "ICAO": "BE"}},
                            {"Jet2.com": {"IATA": "EXS", "ICAO": "LS"}}
                        ]
                }
            ]
    }
    ,
    {
        "continent":
            "Latin America and the Caribbean",
        "countries":
            [
                {
                    "name": "Brazil",
                    "companies":

                        [
                            {"Azul Linheas Aereas Brazileiras": {"IATA": "AZU", "ICAO": "AD"}},
                            {"GOL Linheas Aereas": {"IATA": "GLO", "ICAO": "G3"}}
                        ]
                },
                {
                    "name":
                        "Chile",
                    "companies":
                        [
                            {"Sky Airline": {"IATA": "SKU", "ICAO": "H2"}}
                        ]
                }
                ,
                {
                    "name":
                        "Colombia",
                    "companies":
                        [
                            {"Easy Fly": {"IATA": "EFY", "ICAO": "EF"}},
                            {"VivaColombia": {"IATA": "VVC", "ICAO": "FC"}}
                        ]
                }
                ,
                {
                    "name":
                        "Costa Rica",
                    "companies":
                        [
                            {"Volaris Costa Rica": {"IATA": "VOC", "ICAO": "Q6"}}
                        ]
                }
                ,
                {
                    "name":
                        "Mexico",
                    "companies":
                        [
                            {"Calafia Airlines": {"IATA": "CFV", "ICAO": "A7"}},
                            {"Interjet": {"IATA": "AIJ", "ICAO": "4O"}},
                            {"VivaAerobus": {"IATA": "VIV", "ICAO": "VB"}},
                            {"Volaris": {"IATA": "VOI", "ICAO": "Q6"}}
                        ]
                }
            ],
        "Middle East":
            [
                {
                    "name": "Jordan",
                    "companies":

                        [
                            {"Air Arabia Jordan": {"IATA": "PTR", "ICAO": "9P"}},
                            {"Jordan Aviation": {"IATA": "JAV", "ICAO": "R5"}}
                        ]
                },
                {
                    "name":
                        "Kuwait",
                    "companies":

                        [
                            {"Jazeera Airways": {"IATA": "JZR", "ICAO": "J9"}}
                        ]
                }


            ]
    }
    ,
    {
        "continent":
            "North America",
        "countries":
            [
                {
                    "name": "Canada",
                    "companies":

                        [
                            {"Flair Airlines": {"IATA": "FLE", "ICAO": "F8"}},
                            {"Sunwing": {"IATA": "SWG", "ICAO": "WG"}},
                            {"Westjet Airlines": {"IATA": "WJA", "ICAO": "WS"}},
                            {"Westjet Encore": {"IATA": "WEN", "ICAO": "WR"}}
                        ]
                },
                {
                    "name":
                        "United States",
                    "companies":
                        [
                            {"Air Tran Airways": {"IATA": "TRS", "ICAO": "FL"}},
                            {"Allegiant Air": {"IATA": "AAY", "ICAO": "G4"}},
                            {"Frontier Airlines": {"IATA": "FFT", "ICAO": "F9"}},
                            {"JetBlue Airways": {"IATA": "JBU", "ICAO": "B6"}},
                            {"Southwest Airlines": {"IATA": "SWA", "ICAO": "WN"}},
                            {"Spirit Airlines": {"IATA": "NKS", "ICAO": "NK"}},
                            {"Sun Country Airlines": {"IATA": "SCX", "ICAO": "SY"}},
                            {"ViaAir": {"IATA": "SRY", "ICAO": "VC"}},
                            {"Virgin America": {"IATA": "VRD", "ICAO": "VX"}}
                        ]
                }
            ]
    }
]