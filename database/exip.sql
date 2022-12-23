# ************************************************************
# UKEF EXIPS SQL Database
# Version 0.1
#
# Database: exip
# Generation Time: 2022-11-30 11:44:13 +0000
# ************************************************************

CREATE DATABASE IF NOT EXISTS `exip`;

USE `exip`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# FOREIGN KEY CHECKS : OFF
# ------------------------------------------------------------
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;

# Dump of table Application
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Application` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  `referenceNumber` int DEFAULT NULL,
  `submissionDeadline` datetime(3) DEFAULT NULL,
  `submissionType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Manual Inclusion Application',
  `eligibility` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `policyAndExport` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Application_referenceNumber_idx` (`referenceNumber`),
  KEY `Application_eligibility_idx` (`eligibility`),
  KEY `Application_policyAndExport_idx` (`policyAndExport`),
  CONSTRAINT `Application_eligibility_fkey` FOREIGN KEY (`eligibility`) REFERENCES `Eligibility` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_policyAndExport_fkey` FOREIGN KEY (`policyAndExport`) REFERENCES `PolicyAndExport` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Country
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Country` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isoCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `Country` WRITE;
/*!40000 ALTER TABLE `Country` DISABLE KEYS */;

INSERT INTO `Country` (`id`, `isoCode`, `name`)
VALUES
	('clacmafxb1896bfoqawpj8stp','XAD','Abu Dhabi'),
	('clacmafxb1898bfoqiv3qcbbx','AFG','Afghanistan'),
	('clacmav3b1943bfoqtyipjbnp','ALB','Albania'),
	('clacmav3b1945bfoq2zszn2mn','ASM','American Samoa'),
	('clacmav3b1946bfoqxn9qhgr6','AIA','Anguilla'),
	('clacmav3b1947bfoql4wcdoj9','AND','Andorra'),
	('clacmav3b1949bfoqg9nvf80i','DZA','Algeria'),
	('clacmav3b1952bfoqaifitiuc','ATG','Antigua and Barbuda'),
	('clacmav3b1955bfoq0n8qzy17','ARM','Armenia'),
	('clacmav3b1957bfoqegkdteno','ARG','Argentina'),
	('clacmav3b1958bfoqltoo89x6','AUS','Australia'),
	('clacmav3b1959bfoqvw9h76rd','AGO','Angola'),
	('clacmav3b1960bfoq9a8rowto','AUT','Austria'),
	('clacmav3b1965bfoq4y02rtus','AZE','Azerbaijan'),
	('clacmav3b1967bfoqvh0y9rlm','BHS','Bahamas'),
	('clacmav3b1968bfoqmn2upiiq','BHR','Bahrain'),
	('clacmav3b1969bfoq0xzcx163','ABW','Aruba'),
	('clacmav3b1970bfoqs99y667u','BGD','Bangladesh'),
	('clacmav3b1974bfoq0fp12g6g','BRB','Barbados'),
	('clacmav3b1977bfoq9szz9cr2','BLR','Belarus'),
	('clacmav3b1978bfoqxs2ooz3s','BEL','Belgium'),
	('clacmav3b1981bfoqa5b3x202','BEN','Benin'),
	('clacmav3b1983bfoqbt9as4os','BMU','Bermuda'),
	('clacmav3b1984bfoqc4jsbkgc','BTN','Bhutan'),
	('clacmav3b1987bfoqbrvgz6k7','BOL','Bolivia'),
	('clacmav3b1988bfoq21l4fage','BLZ','Belize'),
	('clacmav3b1991bfoqhglnsd6x','BIH','Bosnia and Herzegovina'),
	('clacmav3b1993bfoq58xrxs16','BWA','Botswana'),
	('clacmav3b1995bfoqpry66r4e','BRA','Brazil'),
	('clacmav3b1996bfoqn4au0b98','IOT','British Indian Ocean Territory'),
	('clacmav3b1999bfoqz0xk3zv2','BRN','Brunei Darussalam'),
	('clacmav3b2001bfoq3aghnllw','BGR','Bulgaria'),
	('clacmav3b2003bfoqgobb9jph','MMR','Burma or Myanmar'),
	('clacmav3b2005bfoq6uj5wi3c','BFA','Burkina Faso'),
	('clacmav3b2007bfoqm89tc5mw','BDI','Burundi'),
	('clacmav3b2009bfoq3fnwufwo','XCB','CABEI'),
	('clacmav3b2010bfoq9wv4ukp5','KHM','Cambodia'),
	('clacmav3b2013bfoqjg04yapw','CMR','Cameroon'),
	('clacmav3c2015bfoq7rmwa0pq','CAN','Canada'),
	('clacmav3c2016bfoqgs5w2iwj','CYM','Cayman Islands'),
	('clacmav3c2018bfoqwigrzis8','CPV','Cape Verde'),
	('clacmav3c2021bfoq3nlznj0d','CAF','Central African Republic'),
	('clacmav3c2023bfoqg44q7jb5','TCD','Chad'),
	('clacmav3c2024bfoqi997m8uh','CHL','Chile'),
	('clacmav3c2027bfoqb7g1c779','COL','Colombia'),
	('clacmav3c2028bfoq147clqk3','COM','Comoros'),
	('clacmav3c2029bfoqyd62m2fh','CHN','China'),
	('clacmav3c2033bfoqjtzzsutg','COG','Congo'),
	('clacmav3c2035bfoqe7tbnsuo','COK','Cook Islands'),
	('clacmav3c2037bfoqf2qola2u','COD','Congo, Democratic Republic of'),
	('clacmav3c2039bfoqvrkk2lwr','XCA','Cor Andino Fom'),
	('clacmav3c2040bfoqeod1um7i','CRI','Costa Rica'),
	('clacmav3c2042bfoq1vm0yumx','HRV','Croatia'),
	('clacmav3c2044bfoqhnr9itme','CIV','Cote d Ivoire'),
	('clacmav3c2047bfoq7w1yz19p','CUB','Cuba'),
	('clacmav3c2048bfoqbypm5bcb','CZE','Czech Republic'),
	('clacmav3c2051bfoqm3deu1bw','CYP','Cyprus'),
	('clacmav3c2052bfoqvfm1ey05','DNK','Denmark'),
	('clacmav3c2055bfoqeop5lgal','DJI','Djibouti'),
	('clacmav3c2057bfoqav49vkkm','DMA','Dominica'),
	('clacmav3c2059bfoq8797fnin','DOM','Dominican Republic'),
	('clacmav3c2061bfoqqosk5t0w','XDB','Dubai'),
	('clacmav3c2062bfoqeuia2dtl','ECU','Ecuador'),
	('clacmav3c2063bfoq282bvfhk','SLV','El Salvador'),
	('clacmav3c2067bfoqd5ppe0i7','EGY','Egypt'),
	('clacmav3c2069bfoq9fhv8kyx','ERI','Eritrea'),
	('clacmav3c2070bfoqidq0xbrq','GNQ','Equatorial Guinea'),
	('clacmav3c2073bfoqylwvj42y','EST','Estonia'),
	('clacmav3c2074bfoq61libeuk','FRO','Faroe Islands'),
	('clacmav3c2075bfoqpyfcwssh','ETH','Ethiopia'),
	('clacmav3c2077bfoq41kirsh6','FLK','Falkland Islands'),
	('clacmav3c2078bfoqro5y1spt','FJI','Fiji'),
	('clacmav3c2082bfoq5hvle7d9','FIN','Finland'),
	('clacmav3c2083bfoqv9gryvjv','FRA','France'),
	('clacmav3c2084bfoqlvtn812c','PYF','French Polynesia'),
	('clacmav3c2087bfoq403kygq1','GAB','Gabon'),
	('clacmav3c2089bfoqfjdq54sg','ATF','French Southern Territories'),
	('clacmav3c2092bfoqn8o52moa','GEO','Georgia'),
	('clacmav3c2093bfoqo73b7sla','GMB','Gambia'),
	('clacmav3c2096bfoq41rr7whx','GHA','Ghana'),
	('clacmav3c2097bfoqnulu1kp4','DEU','Germany'),
	('clacmav3c2100bfoqumxnnr8g','GIB','Gibraltar'),
	('clacmav3c2101bfoq04wh2hih','GRL','Greenland'),
	('clacmav3c2102bfoqesvckjln','GRC','Greece'),
	('clacmav3c2106bfoqmcznw88y','GRD','Grenada'),
	('clacmav3c2107bfoq1a64400s','GTM','Guatemala'),
	('clacmav3c2109bfoq1v5l4iid','GUM','Guam'),
	('clacmav3c2110bfoqk4vakh9e','GIN','Guinea'),
	('clacmav3c2114bfoqm7rgux3d','GNB','Guinea Bissau'),
	('clacmav3c2116bfoqnd7xbegm','GUY','Guyana'),
	('clacmav3c2117bfoqtdvaa6jg','HTI','Haiti'),
	('clacmav3c2118bfoqmsqcllsl','HND','Honduras'),
	('clacmav3c2120bfoq30ou2rju','HKG','Hong Kong'),
	('clacmav3c2124bfoqqler0g0x','HUN','Hungary'),
	('clacmav3c2125bfoqbbyded8o','ISL','Iceland'),
	('clacmav3c2128bfoqanuex2vc','IND','India'),
	('clacmav3c2130bfoqfzx1wquh','IDN','Indonesia'),
	('clacmav3c2132bfoqd4d13790','IRN','Iran'),
	('clacmav3c2134bfoq0ssh5dme','IRL','Ireland'),
	('clacmav3c2135bfoqa9s5we3i','IRQ','Iraq'),
	('clacmav3c2137bfoqlfo0jq85','JAM','Jamaica'),
	('clacmav3c2139bfoqdi9r9h5z','ISR','Israel'),
	('clacmav3c2140bfoqvppyo6md','JPN','Japan'),
	('clacmav3c2142bfoqchob2vq5','ITA','Italy'),
	('clacmav3c2146bfoqsuhehae2','JOR','Jordan'),
	('clacmav3c2148bfoq7hqnaj0s','KEN','Kenya'),
	('clacmav3c2149bfoqunphailw','KAZ','Kazakhstan'),
	('clacmav3c2152bfoqop4jt076','KIR','Kiribati'),
	('clacmav3c2153bfoq04url1bc','PRK','Korea, Democratic Peoples Republic of'),
	('clacmav3c2154bfoquga8n88w','XKX','Kosovo'),
	('clacmav3c2155bfoqy4pbq3za','KOR','Korea, Republic of'),
	('clacmav3c2160bfoqx9mfe7ac','KWT','Kuwait'),
	('clacmav3c2161bfoq3zw9r5qp','KGZ','Kyrgyzstan'),
	('clacmav3c2164bfoqlhwf4oad','LAO','Lao Peoples Democratic Republic'),
	('clacmav3c2166bfoqronxm0ih','LVA','Latvia'),
	('clacmav3c2167bfoquuznayja','LBN','Lebanon'),
	('clacmav3c2168bfoq91zv49gl','LSO','Lesotho'),
	('clacmav3c2169bfoqa59fmhaw','LBR','Liberia'),
	('clacmav3c2170bfoq5h784u5e','LBY','Libya'),
	('clacmav3c2176bfoqmzbeqj29','LIE','Liechtenstein'),
	('clacmav3c2178bfoqvunc9fct','LTU','Lithuania'),
	('clacmav3c2180bfoqul6926az','LUX','Luxembourg'),
	('clacmav3c2182bfoqrnw7y3hu','MDG','Madagascar'),
	('clacmav3c2183bfoq53pnq5mt','MAC','Macao'),
	('clacmav3c2184bfoqbnx10y4u','MKD','Macedonia'),
	('clacmav3c2188bfoqmlgg1v09','MWI','Malawi'),
	('clacmav3c2191bfoq2os349uj','MYS','Malaysia'),
	('clacmav3c2193bfoq2uh56ufo','MDV','Maldives'),
	('clacmav3c2195bfoq1x6wu22j','MLT','Malta'),
	('clacmav3c2196bfoq7bfjgczu','MLI','Mali'),
	('clacmav3c2199bfoqvpjyo3p8','MRT','Mauritania'),
	('clacmav3c2200bfoqfsj8san3','MHL','Marshall Islands'),
	('clacmav3c2202bfoqakdxl0xd','MUS','Mauritius'),
	('clacmav3c2205bfoq3pwjeu03','FSM','Micronesia, Federated States of'),
	('clacmav3c2206bfoqkarqjnb1','MEX','Mexico'),
	('clacmav3c2207bfoq9a9wvaon','MDA','Moldova Republic of'),
	('clacmav3c2208bfoqlj2ilyji','MCO','Monaco'),
	('clacmav3c2213bfoquk7v4fx1','MNG','Mongolia'),
	('clacmav3c2215bfoq0zzgwzlw','MSR','Montserrat'),
	('clacmav3c2216bfoqdxe3359j','MNE','Montenegro'),
	('clacmav3d2219bfoqmp0ko4pr','MAR','Morocco'),
	('clacmav3d2220bfoq7kzcv0kv','MOZ','Mozambique'),
	('clacmav3d2223bfoq2bppoftl','NAM','Namibia'),
	('clacmav3d2224bfoqxqgpyzv8','NRU','Nauru'),
	('clacmav3d2225bfoquul2ct8h','NPL','Nepal'),
	('clacmav3d2229bfoq3h4vcntl','NLD','Netherlands'),
	('clacmav3d2230bfoqmwk6miuu','ANT','Netherlands Antilles'),
	('clacmav3d2231bfoqf08ew1bk','NCL','New Caledonia'),
	('clacmav3d2232bfoqvuij1m32','NZL','New Zealand'),
	('clacmav3d2237bfoq5bknic56','NIC','Nicaragua'),
	('clacmav3d2239bfoqa41cjmbx','NER','Niger'),
	('clacmav3d2240bfoqod04it4a','NGA','Nigeria'),
	('clacmav3d2243bfoqjs07erfx','NIU','Niue'),
	('clacmav3d2244bfoqnq6yj9wk','MNP','Northern Mariana Islands'),
	('clacmav3d2247bfoqrie7oe6k','NOR','Norway'),
	('clacmav3d2249bfoqk0mcahtv','OMN','Oman'),
	('clacmav3d2250bfoqj683gjfj','PAK','Pakistan'),
	('clacmav3d2253bfoqt18ud7t1','PLW','Palau'),
	('clacmav3d2254bfoqnwzakpma','PSE','Palestinian National Authority'),
	('clacmav3d2255bfoqsh73wgb8','PNG','Papua New Guinea'),
	('clacmav3d2256bfoq75d5liby','PRY','Paraguay'),
	('clacmav3d2261bfoq853qwvn6','PER','Peru'),
	('clacmav3d2263bfoq72ami9a4','PCN','Pitcairn'),
	('clacmav3d2264bfoq5migafip','PHL','Philippines'),
	('clacmav3d2265bfoqqj8z7dy3','PAN','Panama'),
	('clacmav3d2268bfoqiblwefj2','POL','Poland'),
	('clacmav3d2270bfoqwwfke356','PRT','Portugal'),
	('clacmav3d2273bfoqdig0clyg','PRI','Puerto Rico'),
	('clacmav3d2274bfoqomk9f1ca','QAT','Qatar'),
	('clacmav3d2275bfoqudy1akm5','ROU','Romania'),
	('clacmav3d2279bfoq9dgkhqu0','RUS','Russian Federation'),
	('clacmav3d2281bfoq0qdeg02r','RWA','Rwanda'),
	('clacmav3d2282bfoq7bv3h4wr','SHN','Saint Helena'),
	('clacmav3d2284bfoq6r9k0dyb','KNA','Saint Kitts and Nevis'),
	('clacmav3d2285bfoq8w9dh66r','LCA','Saint Lucia'),
	('clacmav3d2289bfoq7xfect3o','VCT','Saint Vincent and the Grenadines'),
	('clacmav3d2290bfoqja2h7nmd','SPM','Saint Pierre and Miquelon'),
	('clacmav3d2293bfoqrtsp42z1','SMR','San Marino'),
	('clacmav3d2294bfoqnd5yl5a5','STP','Sao Tome and Principe'),
	('clacmav3d2295bfoqmf9zk2kt','WSM','Samoa'),
	('clacmav3d2297bfoqx1yjwri8','SEN','Senegal'),
	('clacmav3d2301bfoqrbkjxqjz','SAU','Saudi Arabia'),
	('clacmav3d2303bfoq63ux9k2b','SCG','Serbia'),
	('clacmav3d2305bfoq78cn9kk6','SGP','Singapore'),
	('clacmav3d2306bfoq8hpgbbwo','SYC','Seychelles'),
	('clacmav3d2309bfoq2314whl5','SVK','Slovakia'),
	('clacmav3d2310bfoqk5172l4e','SLE','Sierra Leone'),
	('clacmav3d2311bfoq67xtko5l','SLB','Solomon Islands'),
	('clacmav3d2315bfoqy8n42q8j','SOM','Somalia'),
	('clacmav3d2316bfoqeh4tp5y3','ESP','Spain'),
	('clacmav3d2317bfoqw890c8wt','ZAF','South Africa'),
	('clacmav3d2321bfoq1zqxanpy','SDN','Sudan'),
	('clacmav3d2322bfoqwc15pd9l','LKA','Sri Lanka'),
	('clacmav3d2323bfoq5hbh9da0','SWZ','Swaziland'),
	('clacmav3d2324bfoqy6rfeunv','SWE','Sweden'),
	('clacmav3d2325bfoqfuzh2ecj','SUR','Suriname'),
	('clacmav3d2331bfoqy2hle20r','CHE','Switzerland'),
	('clacmav3d2333bfoqqbd0bxra','SYR','Syrian Arab Republic'),
	('clacmav3d2334bfoqynputfdl','TWN','Taiwan'),
	('clacmav3d2335bfoq2ckp4d1w','TJK','Tajikistan'),
	('clacmav3d2339bfoqo3f6yncb','TZA','Tanzania United Republic of'),
	('clacmav3d2340bfoqfb1vrpjs','THA','Thailand'),
	('clacmav3d2343bfoq3ziywwff','SVN','Slovenia'),
	('clacmav3d2344bfoqebg74ixw','TON','Tonga'),
	('clacmav3d2345bfoqc24e9rbv','TGO','Togo'),
	('clacmav3d2349bfoq1p4vtnp9','TUN','Tunisia'),
	('clacmav3d2350bfoqrtduzs22','TTO','Trinidad and Tobago'),
	('clacmav3d2351bfoqmpupwybv','TUR','Turkey'),
	('clacmav3d2352bfoqwio7d7wr','TKM','Turkmenistan'),
	('clacmav3d2355bfoqdqsr8gtd','TCA','Turks and Caicos Islands'),
	('clacmav3d2359bfoq91we9pnw','TUV','Tuvalu'),
	('clacmav3d2360bfoqnvwrun3e','UGA','Uganda'),
	('clacmav3d2363bfoq58qpanng','UKR','Ukraine'),
	('clacmav3d2365bfoqo80ax5ah','GBR','United Kingdom'),
	('clacmav3d2366bfoqqrqje6j2','ARE','United Arab Emirates'),
	('clacmav3d2369bfoqsxdh1xkn','URY','Uruguay'),
	('clacmav3d2370bfoq2lhqdlwu','USA','United States'),
	('clacmav3d2373bfoqaxsbi8il','UZB','Uzbekistan'),
	('clacmav3d2375bfoq56r6ufyc','VNM','Viet Nam'),
	('clacmav3d2376bfoqh8zeelf9','VEN','Venezuela'),
	('clacmav3d2379bfoqcn7rd4wq','VAT','Vatican City State (Holy See)'),
	('clacmav3d2380bfoq9hhuvm8j','VUT','Vanuatu'),
	('clacmav3d2381bfoqc0i54rec','VGB','Virgin Islands (British)'),
	('clacmav3d2385bfoqifh8eod4','VIR','Virgin Islands (U.S.)'),
	('clacmav3d2386bfoq4fqf5zkz','WLF','Wallis and Futuna Islands'),
	('clacmav3d2389bfoqkmmkninj','ESH','Western Sahara'),
	('clacmav3d2391bfoqdmzuvfio','YEM','Yemen'),
	('clacmav3d2392bfoqnak6jii4','ZMB','Zambia'),
	('clacmav3d2393bfoq87t2d29n','TLS','Timor Leste, Democratic Republic of'),
	('clacmav3d2396bfoqae5a422d','ZWE','Zimbabwe');

/*!40000 ALTER TABLE `Country` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table Eligibility
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Eligibility` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyerCountry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hasMinimumUkGoodsOrServices` tinyint(1) NOT NULL DEFAULT '0',
  `validExporterLocation` tinyint(1) NOT NULL DEFAULT '0',
  `otherPartiesInvolved` tinyint(1) NOT NULL DEFAULT '0',
  `paidByLetterOfCredit` tinyint(1) NOT NULL DEFAULT '0',
  `needPreCreditPeriodCover` tinyint(1) NOT NULL DEFAULT '0',
  `wantCoverOverMaxAmount` tinyint(1) NOT NULL DEFAULT '0',
  `wantCoverOverMaxPeriod` tinyint(1) NOT NULL DEFAULT '0',
  `hasCompaniesHouseNumber` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Eligibility_application_idx` (`application`),
  KEY `Eligibility_buyerCountry_idx` (`buyerCountry`),
  CONSTRAINT `Eligibility_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Eligibility_buyerCountry_fkey` FOREIGN KEY (`buyerCountry`) REFERENCES `Country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Page
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Page` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `metaTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `content` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table PolicyAndExport
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `PolicyAndExport` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `policyType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestedStartDate` datetime(3) DEFAULT NULL,
  `policyCurrencyCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `totalValueOfContract` int DEFAULT NULL,
  `creditPeriodWithBuyer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `PolicyAndExport_application_idx` (`application`),
  CONSTRAINT `PolicyAndExport_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table ReferenceNumber
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ReferenceNumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ReferenceNumber_application_idx` (`application`),
  CONSTRAINT `ReferenceNumber_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table User
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `User` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# FOREIGN KEY CHECKS : ON
# ------------------------------------------------------------
SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
