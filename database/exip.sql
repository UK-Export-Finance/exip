# ************************************************************
# UKEF EXIPS SQL Database
# Version 0.3
#
# Database: exip
# Generation Time: 2024-04-29 15:09:14 +0000
# ************************************************************

CREATE DATABASE IF NOT EXISTS `exip`;

USE `exip`;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */; /*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

# FOREIGN KEY CHECKS : OFF
# ------------------------------------------------------------
SET @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS;
SET FOREIGN_KEY_CHECKS = 0;


DROP TABLE IF EXISTS `_Account_applications`;

CREATE TABLE `_Account_applications` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_Account_applications_AB_unique` (`A`,`B`),
  KEY `_Account_applications_B_index` (`B`),
  CONSTRAINT `_Account_applications_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_Account_applications_B_fkey` FOREIGN KEY (`B`) REFERENCES `Application` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table _Authentication_account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_Authentication_account`;

CREATE TABLE `_Authentication_account` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_Authentication_account_AB_unique` (`A`,`B`),
  KEY `_Authentication_account_B_index` (`B`),
  CONSTRAINT `_Authentication_account_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_Authentication_account_B_fkey` FOREIGN KEY (`B`) REFERENCES `Authentication` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table _AuthenticationRetry_account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `_AuthenticationRetry_account`;

CREATE TABLE `_AuthenticationRetry_account` (
  `A` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `B` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE KEY `_AuthenticationRetry_account_AB_unique` (`A`,`B`),
  KEY `_AuthenticationRetry_account_B_index` (`B`),
  CONSTRAINT `_AuthenticationRetry_account_A_fkey` FOREIGN KEY (`A`) REFERENCES `Account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `_AuthenticationRetry_account_B_fkey` FOREIGN KEY (`B`) REFERENCES `AuthenticationRetry` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

# Dump of table AccountStatus
# ------------------------------------------------------------
DROP TABLE IF EXISTS `AccountStatus`;

CREATE TABLE `AccountStatus` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isBlocked` tinyint(1) NOT NULL DEFAULT '0',
  `isVerified` tinyint(1) NOT NULL DEFAULT '0',
  `isInactive` tinyint(1) NOT NULL DEFAULT '0',
  `updatedAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table Account
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Account`;

CREATE TABLE `Account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  `firstName` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lastName` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `salt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `verificationHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `verificationExpiry` datetime(3) DEFAULT NULL,
  `otpSalt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `otpHash` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `otpExpiry` datetime(3) DEFAULT NULL,
  `sessionExpiry` datetime(3) DEFAULT NULL,
  `sessionIdentifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `passwordResetHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `passwordResetExpiry` datetime(3) DEFAULT NULL,
  `authentication` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `authenticationRetry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`reactivationExpiry` datetime(3) DEFAULT NULL,
  `reactivationHash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `status` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_authentication_key` (`authentication`),
  UNIQUE KEY `Account_authenticationRetry_key` (`authenticationRetry`),
  UNIQUE KEY `Account_status_key` (`status`),
  KEY `Account_authentication_idx` (`authentication`),
  KEY `Account_authenticationRetry_idx` (`authenticationRetry`),
  KEY `Account_status_idx` (`status`),
  CONSTRAINT `Account_authentication_fkey` FOREIGN KEY (`authentication`) REFERENCES `Authentication` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Account_authenticationRetry_fkey` FOREIGN KEY (`authenticationRetry`) REFERENCES `AuthenticationRetry` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Account_status_fkey` FOREIGN KEY (`status`) REFERENCES `AccountStatus` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Application
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Application`;

CREATE TABLE `Application` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) DEFAULT NULL,
  `updatedAt` datetime(3) DEFAULT NULL,
  `eligibility` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `referenceNumber` int DEFAULT NULL,
	`submissionCount` int NOT NULL DEFAULT '0',
  `submissionDeadline` datetime(3) DEFAULT NULL,
	`submissionDate` datetime(3) DEFAULT NULL,
  `submissionType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT 'Manual Inclusion Application',
  `policy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`exportContract` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `broker` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`buyer` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
	`previousStatus` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`declaration` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`sectionReview` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`owner` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '1',
	`dealType` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'EXIP',
  `policyContact` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nominatedLossPayee` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Application_eligibility_idx` (`eligibility`),
  KEY `Application_referenceNumber_idx` (`referenceNumber`),
  KEY `Application_policy_idx` (`policy`),
  KEY `Application_company_idx` (`company`),
  KEY `Application_business_idx` (`business`),
  KEY `Application_broker_idx` (`broker`),
	KEY `Application_buyer_idx` (`buyer`),
	KEY `Application_declaration_idx` (`declaration`),
	KEY `Application_exportContract_idx` (`exportContract`),
	KEY `Application_sectionReview_idx` (`sectionReview`),
	KEY `Application_owner_idx` (`owner`),
  KEY `Application_policyContact_idx` (`policyContact`),
  KEY `Application_nominatedLossPayee_idx` (`nominatedLossPayee`),
	CONSTRAINT `Application_buyer_fkey` FOREIGN KEY (`buyer`) REFERENCES `Buyer` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `Application_declaration_fkey` FOREIGN KEY (`declaration`) REFERENCES `Declaration` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_eligibility_fkey` FOREIGN KEY (`eligibility`) REFERENCES `Eligibility` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_broker_fkey` FOREIGN KEY (`broker`) REFERENCES `Broker` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_business_fkey` FOREIGN KEY (`business`) REFERENCES `Business` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_company_fkey` FOREIGN KEY (`company`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `Application_exportContract_fkey` FOREIGN KEY (`exportContract`) REFERENCES `ExportContract` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_nominatedLossPayee_fkey` FOREIGN KEY (`nominatedLossPayee`) REFERENCES `NominatedLossPayee` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_policy_fkey` FOREIGN KEY (`policy`) REFERENCES `Policy` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `Application_sectionReview_fkey` FOREIGN KEY (`sectionReview`) REFERENCES `SectionReview` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `Application_owner_fkey` FOREIGN KEY (`owner`) REFERENCES `Account` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Application_policyContact_fkey` FOREIGN KEY (`policyContact`) REFERENCES `PolicyContact` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Authentication
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Authentication`;

CREATE TABLE `Authentication` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table AuthenticationRetry
# ------------------------------------------------------------

DROP TABLE IF EXISTS `AuthenticationRetry`;

CREATE TABLE `AuthenticationRetry` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Buyer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Buyer`;

CREATE TABLE `Buyer` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyOrOrganisationName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `address` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `country` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `registrationNumber` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `website` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `buyerTradingHistory` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contact` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `relationship` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Buyer_buyerTradingHistory_key` (`buyerTradingHistory`),
  UNIQUE KEY `Buyer_contact_key` (`contact`),
  UNIQUE KEY `Buyer_relationship_key` (`relationship`),
  KEY `Buyer_application_idx` (`application`),
  KEY `Buyer_country_idx` (`country`),
  CONSTRAINT `Buyer_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Buyer_contact_fkey` FOREIGN KEY (`contact`) REFERENCES `BuyerContact` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Buyer_relationship_fkey` FOREIGN KEY (`relationship`) REFERENCES `BuyerRelationship` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Buyer_buyerTradingHistory_fkey` FOREIGN KEY (`buyerTradingHistory`) REFERENCES `BuyerTradingHistory` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Buyer_country_fkey` FOREIGN KEY (`country`) REFERENCES `Country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# Dump of table BuyerContact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BuyerContact`;

CREATE TABLE `BuyerContact` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contactFirstName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contactLastName` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contactPosition` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `contactEmail` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `canContactBuyer` tinyint(1) DEFAULT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BuyerContact_application_idx` (`application`),
  CONSTRAINT `BuyerContact_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


# Dump of table BuyerRelationship
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BuyerRelationship`;

CREATE TABLE `BuyerRelationship` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `exporterIsConnectedWithBuyer` tinyint(1) DEFAULT NULL,
  `connectionWithBuyerDescription` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `exporterHasPreviousCreditInsuranceWithBuyer` tinyint(1) DEFAULT NULL,
  `exporterHasBuyerFinancialAccounts` tinyint(1) DEFAULT NULL,
  `previousCreditInsuranceWithBuyerDescription` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BuyerRelationship_application_idx` (`application`),
  CONSTRAINT `BuyerRelationship_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


# Dump of table BuyerTradingHistory
# ------------------------------------------------------------

DROP TABLE IF EXISTS `BuyerTradingHistory`;

CREATE TABLE `BuyerTradingHistory` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `currencyCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `outstandingPayments` tinyint(1) DEFAULT NULL,
  `failedPayments` tinyint(1) DEFAULT NULL,
  `exporterHasTradedWithBuyer` tinyint(1) DEFAULT NULL,
  `totalOverduePayments` int DEFAULT NULL,
  `totalOutstandingPayments` int DEFAULT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BuyerTradingHistory_application_idx` (`application`),
  CONSTRAINT `BuyerTradingHistory_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


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
	('clacmav3d2303bfoq63ux9k2b','SRB','Serbia'),
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


# Dump of table CoverPeriod
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CoverPeriod`;

CREATE TABLE `CoverPeriod` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valueId` int DEFAULT NULL,
  `value` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `CoverPeriod` WRITE;
/*!40000 ALTER TABLE `CoverPeriod` DISABLE KEYS */;

INSERT INTO `CoverPeriod` (`id`, `valueId`, `value`)
VALUES
	('cloiparaj000doq73pmr6blua',1,'1 to 24 months'),
	('cloiparaj000doq73pmr6blub',2,'More than 2 years');

/*!40000 ALTER TABLE `CoverPeriod` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table Declaration
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Declaration`;

CREATE TABLE `Declaration` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreeToConfidentiality` tinyint(1) DEFAULT NULL,
  `antiBribery` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agreeToAntiBribery` tinyint(1) DEFAULT NULL,
  `agreeToConfirmationAndAcknowledgements` tinyint(1) DEFAULT NULL,
  `willExportWithAntiBriberyCodeOfConduct` tinyint(1) DEFAULT NULL,
  `hasAntiBriberyCodeOfConduct` tinyint(1) DEFAULT NULL,
  `agreeHowDataWillBeUsed` tinyint(1) DEFAULT NULL,
  `confirmationAndAcknowledgements` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `howDataWillBeUsed` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Declaration_application_idx` (`application`),
  KEY `Declaration_antiBribery_idx` (`antiBribery`),
  KEY `Declaration_confirmationAndAcknowledgements_idx` (`confirmationAndAcknowledgements`),
  KEY `Declaration_howDataWillBeUsed_idx` (`howDataWillBeUsed`),
  CONSTRAINT `Declaration_antiBribery_fkey` FOREIGN KEY (`antiBribery`) REFERENCES `DeclarationAntiBribery` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Declaration_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Declaration_confirmationAndAcknowledgements_fkey` FOREIGN KEY (`confirmationAndAcknowledgements`) REFERENCES `DeclarationConfirmationAndAcknowledgement` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Declaration_howDataWillBeUsed_fkey` FOREIGN KEY (`howDataWillBeUsed`) REFERENCES `DeclarationHowDataWillBeUsed` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*!40000 ALTER TABLE `Declaration` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table DeclarationAntiBribery
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DeclarationAntiBribery`;

CREATE TABLE `DeclarationAntiBribery` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `content` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `DeclarationAntiBribery` WRITE;
/*!40000 ALTER TABLE `DeclarationAntiBribery` DISABLE KEYS */;

INSERT INTO `DeclarationAntiBribery` (`id`, `version`, `content`)
VALUES
	('clfb5krcn0850b6oqpvcut5z8','2','[{\"type\": \"paragraph\", \"children\": [{\"text\": \"By submitting this application (also known as a `proposal`), you declare that except for any matters you have told us about in writing:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"neither you nor any of your current Senior Officers appear on a debarment list published by the World Bank Group, the African Development Bank, the Asian Development Bank, the European Bank for Reconstruction and Development or the Inter-American Development Bank (or any successor organisations of the foregoing), of contractors or individuals who are ineligible to tender for, or participate in, any project they fund;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you have no reason to believe, after having made reasonable enquiries, that any Involved Group Company, Consortium Party or Agent, or any of their current Senior Officers, appear on any such list;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"during the last 5 years neither you nor any of your current Senior Officers or any Group Company have:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"been found guilty by any court or competent authority of a Relevant Offence or any offence relating to bribery or corruption under the law of any jurisdiction outside the UK;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"been subject to any administrative sanction (for example, a deferred prosecution agreement or civil forfeiture order) or other similar administrative measure anywhere in the world for contravening any laws which prohibit bribery, including bribery of foreign public officials; or\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"admitted to having engaged in any offence or activity as referred to in paragraph (3)(a) above or has admitted to engaging in any other activity which is prohibited under applicable laws relating to bribery or corrupt activity;\"}]}]}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"neither you nor any of your current Senior Officers or any Group Company are currently under charge in any court or before any competent authority, or to the best of your knowledge, subject to a formal investigation by public prosecutors on the grounds that you or they have committed an offence of the type listed in paragraph 3(a) above;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"neither you nor any Group Company has: engaged in, any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement (which includes any unilateral undertaking as well as any consent or authorisation needed to obtain or perform the export contract(s) but not any subcontract);\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"neither you nor any Involved Group Company has any knowledge of any person engaging in any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you have no reason to believe and you do not believe, after having made reasonable enquiries, that:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"any Consortium Party or Agent, any of their current Senior Officers has at any time during the last five years engaged in or been subject to any of the events referred to in paragraph (3) above;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"any Consortium Party or Agent or any of their current Senior Officers has at any time during the last five years been subject to any of the events referred to in paragraph (4) above; or\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"any Consortium Party or Agent has engaged in any Potential Corrupt Activity or Corrupt Activity in relation to the export contract(s) or any related agreement;\"}]}]}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you have made reasonable enquiries regarding (i) any Consortium Party or Agent and its conduct in relation to the export contract and any related agreement; and (ii) whether any Group Companies, at the date of this Proposal, have had, or are intended to have any material part in the negotiation or supply of the export contract:\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"the export contract(s) referred to in this Proposal , and all arrangements connected with its/their financing or procurement, have not been, and will not be, used for the purposes of money laundering (as defined in Part 7 of the Proceeds of Crime Act 2002) or in any other manner that would constitute a Relevant Offence.\"}]}]}]}, {\"type\": \"paragraph\", \"children\": [{\"text\": \"\"}]}]');

/*!40000 ALTER TABLE `DeclarationAntiBribery` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table DeclarationConfidentiality
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DeclarationConfidentiality`;

CREATE TABLE `DeclarationConfidentiality` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` json NOT NULL,
  `version` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `DeclarationConfidentiality` WRITE;
/*!40000 ALTER TABLE `DeclarationConfidentiality` DISABLE KEYS */;

INSERT INTO `DeclarationConfidentiality` (`id`, `content`, `version`)
VALUES
	('clf3te7vx1432cfoqp9rbop73','2','[{\"type\": \"paragraph\", \"children\": [{\"text\": \"By submitting this application (also known as a `proposal`) you agree that:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"(unless otherwise agreed) this Proposal, its attachments and all discussions and correspondence relating to it are confidential and will not be disclosed to any third party except:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"by you, on a confidential basis to your bank, broker, lawyers, other professional advisers, or auditors, in each case for the purpose for which each of them has been engaged by you;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"by us in accordance with applicable law (including the provisions of the Export and Investment Guarantees Act 1991) or our obligations to Parliament as a Government Department;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"by us if we decide that we are required to disclose it in accordance under the Freedom of Information Act2000 or the Environmental Information Regulations 2004; or\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"by us:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"to our lawyers and other professional advisers, auditors, other Government Departments and reinsurers (including other export credit agencies) on a confidential basis in connection with our consideration of this application or the issue or reinsurance of any policy; and\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"to third party service providers (such as IT contractors) in order to enable them to provide services to us and on the basis that the information must be held securely and in confidence;\"}]}]}]}]}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"(unless otherwise agreed) information we hold about you (but not including details of any contract that we enter into with you or for your benefit or information about any of your export contracts, other than the export market involved) may be shared on a confidential basis between any Government Departments and/or other public sector bodies that are involved in supporting trade and investment to assist them in discharging their functions; and\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"if we ask you to agree to our disclosing information to anyone not mentioned in paragraph (1)(b) to (d) above, you will not unreasonably delay or withhold your agreement to this.\"}]}]}]}, {\"type\": \"paragraph\", \"children\": [{\"text\": \"\"}]}]');

/*!40000 ALTER TABLE `DeclarationConfidentiality` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table DeclarationConfirmationAndAcknowledgement
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DeclarationConfirmationAndAcknowledgement`;

CREATE TABLE `DeclarationConfirmationAndAcknowledgement` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `content` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `DeclarationConfirmationAndAcknowledgement` WRITE;
/*!40000 ALTER TABLE `DeclarationConfirmationAndAcknowledgement` DISABLE KEYS */;

INSERT INTO `DeclarationConfirmationAndAcknowledgement` (`id`, `version`, `content`)
VALUES
	('clfdt2h8k0087cdoq8mc361ug','2','[{\"type\": \"paragraph\", \"children\": [{\"text\": \"By submitting this application (also known as a `proposal`):\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you confirm that the information contained in this Proposal (application) and any related discussions or correspondence constitutes a fair presentation of the risk to include all material facts and circumstances; and\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you acknowledge that:\"}]}, {\"type\": \"ordered-list\", \"children\": [{\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you should contact us or your broker (if applicable) if you are in any doubt as to what constitutes a material fact;\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"we will rely on the information, statements and declarations in this Proposal when deciding whether, and on what terms, to issue any policy; and\"}]}]}, {\"type\": \"list-item\", \"children\": [{\"type\": \"list-item-content\", \"children\": [{\"text\": \"you must continue to disclose material facts to us and any changes to material facts after the date of signature of this Proposal (application) until the date cover commences under any policy unless this would, or might reasonably be considered to, constitute the offence of \\"tipping off\\" under s.333A of the Proceeds of Crime Act 2002.\"}]}]}]}]}]}, {\"type\": \"paragraph\", \"children\": [{\"text\": \"\"}]}]');

/*!40000 ALTER TABLE `DeclarationConfirmationAndAcknowledgement` ENABLE KEYS */;
UNLOCK TABLES;



# Dump of table DeclarationHowDataWillBeUsed
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DeclarationHowDataWillBeUsed`;

CREATE TABLE `DeclarationHowDataWillBeUsed` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `version` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `content` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `DeclarationHowDataWillBeUsed` WRITE;
/*!40000 ALTER TABLE `DeclarationHowDataWillBeUsed` DISABLE KEYS */;

INSERT INTO `DeclarationHowDataWillBeUsed` (`id`, `version`, `content`)
VALUES
	('clfh2o74i0086saoqgo9dhqgq','2','[{\"type\": \"paragraph\", \"children\": [{\"text\": \"We will process contact details and other personal information you give us in this Proposal in accordance with applicable data protection law.\"}]}, {\"type\": \"paragraph\", \"children\": [{\"text\": \"We may record personal data provided to us in this Proposal in our customer relationship database. Please contact information.access@ukexportfinance.gov.uk if you would like to access, rectify or erase your personal data or to withdraw your consent.\"}]}, {\"type\": \"paragraph\", \"children\": [{\"text\": \"If after contacting us you are still unhappy with the way we handle your personal data, you have a right to lodge a complaint with the Information Commissioner`s Office (\"}, {\"href\": \"https://ico.org.uk/make-a-complaint\", \"type\": \"link\", \"children\": [{\"text\": \"Make a complaint | ICO)\"}]}, {\"text\": \"\"}]}]');

/*!40000 ALTER TABLE `DeclarationHowDataWillBeUsed` ENABLE KEYS */;
UNLOCK TABLES;

# Dump of table CompanyDifferentTradingAddress
# ------------------------------------------------------------

DROP TABLE IF EXISTS `CompanyDifferentTradingAddress`;

CREATE TABLE `CompanyDifferentTradingAddress` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fullAddress` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `CompanyDifferentTradingAddress_company_idx` (`company`),
  CONSTRAINT `CompanyDifferentTradingAddress_company_fkey` FOREIGN KEY (`company`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# Dump of table Eligibility
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Eligibility` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `buyerCountry` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `coverPeriod` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hasCompaniesHouseNumber` tinyint(1) NOT NULL DEFAULT '0',
  `hasEndBuyer` tinyint(1) NOT NULL DEFAULT '0',
  `hasMinimumUkGoodsOrServices` tinyint(1) NOT NULL DEFAULT '0',
  `otherPartiesInvolved` tinyint(1) NOT NULL DEFAULT '0',
  `paidByLetterOfCredit` tinyint(1) NOT NULL DEFAULT '0',
  `totalContractValue` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `validExporterLocation` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `Eligibility_application_idx` (`application`),
  KEY `Eligibility_buyerCountry_idx` (`buyerCountry`),
  KEY `Eligibility_totalContractValue_idx` (`totalContractValue`),
  CONSTRAINT `Eligibility_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Eligibility_buyerCountry_fkey` FOREIGN KEY (`buyerCountry`) REFERENCES `Country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Eligibility_coverPeriod_fkey` FOREIGN KEY (`coverPeriod`) REFERENCES `CoverPeriod` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Eligibility_totalContractValue_fkey` FOREIGN KEY (`totalContractValue`) REFERENCES `TotalContractValue` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table ExportContract
# ------------------------------------------------------------

DROP TABLE IF EXISTS `ExportContract`;

CREATE TABLE `ExportContract` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goodsOrServicesDescription` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `finalDestinationCountryCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `finalDestinationKnown` tinyint(1) DEFAULT NULL,
  `paymentTermsDescription` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `privateMarket` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `agent` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExportContract_privateMarket_key` (`privateMarket`),
  UNIQUE KEY `ExportContract_agent_key` (`agent`),
  KEY `ExportContract_application_idx` (`application`),
  CONSTRAINT `ExportContract_agent_fkey` FOREIGN KEY (`agent`) REFERENCES `ExportContractAgent` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `ExportContract_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `ExportContract_privateMarket_fkey` FOREIGN KEY (`privateMarket`) REFERENCES `PrivateMarket` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table ExportContractAgent
# ------------------------------------------------------------
DROP TABLE IF EXISTS `ExportContractAgent`;

CREATE TABLE `ExportContractAgent` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `countryCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `fullAddress` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isUsingAgent` tinyint(1) DEFAULT NULL,
  `name` varchar(800) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExportContractAgent_service_key` (`service`),
  CONSTRAINT `ExportContractAgent_service_fkey` FOREIGN KEY (`service`) REFERENCES `ExportContractAgentService` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table ExportContractAgentService
# ------------------------------------------------------------
DROP TABLE IF EXISTS `ExportContractAgentService`;

CREATE TABLE `ExportContractAgentService` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `agentIsCharging` tinyint(1) DEFAULT NULL,
  `serviceDescription` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `charge` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ExportContractAgentService_charge_key` (`charge`),
  CONSTRAINT `ExportContractAgentService_charge_fkey` FOREIGN KEY (`charge`) REFERENCES `ExportContractAgentServiceCharge` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table ExportContractAgentServiceCharge
# ------------------------------------------------------------
DROP TABLE IF EXISTS `ExportContractAgentServiceCharge`;

CREATE TABLE `ExportContractAgentServiceCharge` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `percentageCharge` int DEFAULT NULL,
  `fixedSumAmount` int DEFAULT NULL,
  `fixedSumCurrencyCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GBP',
  `method` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payableCountryCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table Broker
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Broker`;

CREATE TABLE `Broker` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isUsingBroker` tinyint(1) DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `addressLine1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `addressLine2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `town` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `county` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `postcode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `fullAddress` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Broker_application_idx` (`application`),
  CONSTRAINT `Broker_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Business
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Business`;

CREATE TABLE `Business` (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `goodsOrServicesSupplied` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `totalYearsExporting` int DEFAULT NULL,
  `totalEmployeesUK` int DEFAULT NULL,
  `estimatedAnnualTurnover` int DEFAULT NULL,
  `exportsTurnoverPercentage` int DEFAULT NULL,
  `hasCreditControlProcess` tinyint(1) DEFAULT NULL,
  `turnoverCurrencyCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `Business_application_idx` (`application`),
  CONSTRAINT `Business_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Company
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Company` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `business` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sicCodes` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `differentTradingAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `companyName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `companyNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `dateOfCreation` datetime(3) DEFAULT NULL,
  `hasDifferentTradingAddress` tinyint(1) DEFAULT NULL,
  `hasDifferentTradingName` tinyint(1) DEFAULT NULL,
  `differentTradingName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `companyWebsite` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
	`registeredOfficeAddress` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
	`financialYearEndDate` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Company_address_key` (`registeredOfficeAddress`),
  KEY `Company_application_idx` (`application`),
  KEY `Company_business_idx` (`business`),
  CONSTRAINT `Company_address_fkey` FOREIGN KEY (`registeredOfficeAddress`) REFERENCES `CompanyAddress` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Different_trading_address_fkey` FOREIGN KEY (`differentTradingAddress`) REFERENCES `CompanyDifferentTradingAddress` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Company_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Company_business_fkey` FOREIGN KEY (`business`) REFERENCES `Business` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table CompanyAddress
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `CompanyAddress` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `addressLine2` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `careOf` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `locality` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `region` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `postalCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `country` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `premises` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table CompanySicCode
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `CompanySicCode` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
	`company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sicCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
	`industrySectorName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
	KEY `CompanySicCode_company_idx` (`company`),
  CONSTRAINT `CompanySicCode_company_fkey` FOREIGN KEY (`company`) REFERENCES `Company` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Feedback
# ------------------------------------------------------------

DROP TABLE IF EXISTS `Feedback`;

CREATE TABLE `Feedback` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `service` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `satisfaction` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `improvement` varchar(1200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `otherComments` varchar(1200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `referralUrl` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `product` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `createdAt` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table JointlyInsuredParty
# ------------------------------------------------------------
DROP TABLE IF EXISTS `JointlyInsuredParty`;

CREATE TABLE `JointlyInsuredParty` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `policy` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requested` tinyint(1) DEFAULT NULL,
  `companyName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `companyNumber` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `countryCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `JointlyInsuredParty_policy_key` (`policy`),
  CONSTRAINT `JointlyInsuredParty_policy_fkey` FOREIGN KEY (`policy`) REFERENCES `Policy` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table LossPayeeFinancialInternational
# ------------------------------------------------------------
DROP TABLE IF EXISTS `LossPayeeFinancialInternational`;

CREATE TABLE `LossPayeeFinancialInternational` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lossPayee` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bankAddress` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `bicSwiftCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `iban` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `vector` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LossPayeeFinancialInternational_lossPayee_key` (`lossPayee`),
  UNIQUE KEY `LossPayeeFinancialInternational_vector_key` (`vector`),
  CONSTRAINT `LossPayeeFinancialInternational_lossPayee_fkey` FOREIGN KEY (`lossPayee`) REFERENCES `NominatedLossPayee` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `LossPayeeFinancialInternational_vector_fkey` FOREIGN KEY (`vector`) REFERENCES `LossPayeeFinancialInternationalVector` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table LossPayeeFinancialInternationalVector
# ------------------------------------------------------------
DROP TABLE IF EXISTS `LossPayeeFinancialInternationalVector`;

CREATE TABLE `LossPayeeFinancialInternationalVector` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bicSwiftCodeVector` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `ibanVector` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table LossPayeeFinancialUk
# ------------------------------------------------------------
DROP TABLE IF EXISTS `LossPayeeFinancialUk`;

CREATE TABLE `LossPayeeFinancialUk` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lossPayee` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accountNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `bankAddress` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `sortCode` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `vector` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `LossPayeeFinancialUk_lossPayee_key` (`lossPayee`),
  UNIQUE KEY `LossPayeeFinancialUk_vector_key` (`vector`),
  CONSTRAINT `LossPayeeFinancialUk_lossPayee_fkey` FOREIGN KEY (`lossPayee`) REFERENCES `NominatedLossPayee` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `LossPayeeFinancialUk_vector_fkey` FOREIGN KEY (`vector`) REFERENCES `LossPayeeFinancialUkVector` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table LossPayeeFinancialUkVector
# ------------------------------------------------------------
DROP TABLE IF EXISTS `LossPayeeFinancialUkVector`;

CREATE TABLE `LossPayeeFinancialUkVector` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountNumberVector` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `sortCodeVector` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table NominatedLossPayee
# ------------------------------------------------------------
DROP TABLE IF EXISTS `NominatedLossPayee`;

CREATE TABLE `NominatedLossPayee` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isAppointed` tinyint(1) DEFAULT NULL,
  `name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isLocatedInUk` tinyint(1) DEFAULT NULL,
  `isLocatedInternationally` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `NominatedLossPayee_application_idx` (`application`),
  CONSTRAINT `NominatedLossPayee_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;



# Dump of table Page
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Page` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heading` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `metaTitle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `content` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table Policy
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `Policy` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `policyType` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestedStartDate` datetime(3) DEFAULT NULL,
	`contractCompletionDate` datetime(3) DEFAULT NULL,
  `policyCurrencyCode` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `totalValueOfContract` int DEFAULT NULL,
  `creditPeriodWithBuyer` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
	`totalMonthsOfCover` int DEFAULT NULL,
	`totalSalesToBuyer` int DEFAULT NULL,
	`maximumBuyerWillOwe` int DEFAULT NULL,
  `needPreCreditPeriodCover` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Policy_application_idx` (`application`),
  CONSTRAINT `Policy_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# Dump of table PolicyContact
# ------------------------------------------------------------

DROP TABLE IF EXISTS `PolicyContact`;

CREATE TABLE `PolicyContact` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `lastName` varchar(400) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `position` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isSameAsOwner` tinyint(1) DEFAULT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PolicyContact_application_idx` (`application`),
  CONSTRAINT `PolicyContact_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


# Dump of table PrivateMarket
# ------------------------------------------------------------
DROP TABLE IF EXISTS `PrivateMarket`;

CREATE TABLE `PrivateMarket` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempted` tinyint(1) DEFAULT NULL,
  `declinedDescription` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;


# Dump of table ReferenceNumber
# ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `ReferenceNumber` (
  `id` int NOT NULL AUTO_INCREMENT,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ReferenceNumber_application_idx` (`application`),
  CONSTRAINT `ReferenceNumber_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table SectionReview
# ------------------------------------------------------------

DROP TABLE IF EXISTS `SectionReview`;

CREATE TABLE `SectionReview` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `eligibility` tinyint(1) DEFAULT NULL,
  `policy` tinyint(1) DEFAULT NULL,
  `business` tinyint(1) DEFAULT NULL,
  `buyer` tinyint(1) DEFAULT NULL,
  `application` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SectionReview_application_idx` (`application`),
  CONSTRAINT `SectionReview_application_fkey` FOREIGN KEY (`application`) REFERENCES `Application` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



# Dump of table TotalContractValue
# ------------------------------------------------------------

DROP TABLE IF EXISTS `TotalContractValue`;

CREATE TABLE `TotalContractValue` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(70) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `valueId` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `TotalContractValue` WRITE;
/*!40000 ALTER TABLE `TotalContractValue` DISABLE KEYS */;

INSERT INTO `TotalContractValue` (`id`, `value`, `valueId`)
VALUES
	('cloijs2bq0019grkcismou66a','Less than 500k',1),
	('cloijs2bq0019grkcismou66b','More than 500k',2),
	('cloijs2bq0019grkcismou66c','Less than 250k',3),
	('cloijs2bq0019grkcismou66d','More than 250k',4);

/*!40000 ALTER TABLE `TotalContractValue` ENABLE KEYS */;
UNLOCK TABLES;



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
SET FOREIGN_KEY_CHECKS = 1;


/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
