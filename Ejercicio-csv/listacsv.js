let clase="hola";

let csv=`product.partNumber,location.locationIdentifier,inventoryType,quantity,quantityUnits,expirationDate,inventoryParentType,class,segment,lotCode,status,value,valueCurrency,sourceLink,storageDate
PS-SL-A287,LT-1,PRODUCT,25,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,521033,Active,31250,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-A288,LT-1,PRODUCT,20,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,3282509,Active,25000,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-H309,LT-1,PRODUCT,3,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,862421,Active,3750,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-H310,LT-1,PRODUCT,35,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,9282139,Active,43750,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-F342,LT-1,PRODUCT,43,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,240235,Active,53750,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-F343,LT-1,PRODUCT,49,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,6895229,Active,61250,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-F344,LT-1,PRODUCT,7,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,2428565,Active,8750,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-F345,LT-1,PRODUCT,40,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,181080,Active,50000,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-B122,LT-1,PRODUCT,16,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,8574639,Active,20000,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-A123,LT-1,PRODUCT,15,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,851604,Active,18750,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-C280,LT-1,PRODUCT,42,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,5028551,Active,52500,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-C193,LT-1,PRODUCT,49,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,2450098,Active,61250,USD,https://foo.com,2022-01-01T00:00:00
PS-SL-L327,LT-1,PRODUCT,30,EA,2022-12-31T00:00:00,ONHAND,NEW,INDUSTRIAL,2116190,Active,37500,USD,https://foo.com,2022-01-01T00:00:00`;