// List of available tables extracted from the KnessetOdataManual.docx
export const TABLES = [
    "KNS_Bill", "KNS_BillName", "KNS_BillInitiator", "KNS_BillHistoryInitiator", "KNS_BillUnion",
    "KNS_BillSplit", "KNS_DocumentBill", "KNS_IsraelLaw", "KNS_IsraelLawName", "KNS_IsraelLawMinistry",
    "KNS_IsraelLawClassificiation", "KNS_IsraelLawBinding", "KNS_LawBinding", "KNS_DocumentIsraelLaw",
    "KNS_Law", "KNS_DocumentLaw", "KNS_SecondaryLaw", "KNS_SecLawRegulator", "KNS_SecLawAuthorizingLaw",
    "KNS_DocumentSecondaryLaw", "KNS_SecToSecBinding", "KNS_Agenda", "KNS_DocumentAgenda", "KNS_Query",
    "KNS_DocumentQuery", "KNS_Committee", "KNS_CommitteeSession", "KNS_CmtSessionItem",
    "KNS_DocumentCommitteeSession", "KNS_JointCommittee", "KNS_BroadcastCommitteSession",
    "KNS_CmtSiteCode", "KNS_PlenumSession", "KNS_PlmSessionItem", "KNS_DocumentPlenumSession",
    "KNS_PlenumVote", "KNS_PlenumVoteResult", "KNS_Person", "KNS_Position", "KNS_PersonToPosition",
    "KNS_MkSiteCode", "KNS_Faction", "KNS_KnessetDates", "KNS_GovMinistry", "KNS_ItemType", "KNS_Status"
];

// Detailed metadata for table fields, manually extracted from the document
export const TABLE_FIELDS_METADATA = {
    "KNS_Bill": [
        {name: "ID", type: "Int"}, {name: "KnessetNum", type: "int"}, {name: "Name", type: "String"},
        {name: "TypeID", type: "Int"}, {name: "TypeDesc", type: "String"}, {name: "SubTypeID", type: "Int"},
        {name: "SubTypeDesc", type: "string"}, {name: "PrivateNumber", type: "Int"}, {name: "CommitteeID", type: "Int"},
        {name: "StatusID", type: "Int"}, {name: "Number", type: "Int"}, {name: "PostponementReasonID", type: "Int"},
        {name: "PostponementReasonDesc", type: "string"}, {name: "PublicationDate", type: "datetime"},
        {name: "PublicationSeriesID", type: "Int"}, {name: "PublicationSeriesDesc", type: "string"},
        {name: "PublicationSeriesFirstCallID", type: "Int"}, {name: "PublicationSeriesFirstCallDesc", type: "string"},
        {name: "MagazineNumber", type: "Int"}, {name: "PageNumber", type: "Int"}, {name: "IsContinuationBill", type: "bit"},
        {name: "SummaryLaw", type: "String"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BillName": [
        {name: "ID", type: "int"}, {name: "BillID", type: "int"}, {name: "Name", type: "string"},
        {name: "NameHistoryTypeID", type: "int"}, {name: "NameHistoryTypeDesc", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BillInitiator": [
        {name: "ID", type: "int"}, {name: "BillID", type: "int"}, {name: "PersonID", type: "int"},
        {name: "IsInitiator", type: "bit"}, {name: "Ordinal", type: "int"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BillHistoryInitiator": [
        {name: "ID", type: "int"}, {name: "BillID", type: "int"}, {name: "PersonID", type: "int"},
        {name: "IsInitiator", type: "bit"}, {name: "StartDate", type: "datetime"}, {name: "EndDate", type: "datetime"},
        {name: "ReasonID", type: "int"}, {name: "ReasonDesc", type: "string"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BillUnion": [
        {name: "ID", type: "int"}, {name: "MainBillID", type: "int"}, {name: "UnionBillID", type: "int"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BillSplit": [
        {name: "ID", type: "int"}, {name: "MainBillID", type: "int"}, {name: "SplitBillID", type: "int"},
        {name: "Name", type: "string"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentBill": [
        {name: "ID", type: "int"}, {name: "BillID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_IsraelLaw": [
        {name: "ID", type: "int"}, {name: "KnessetNum", type: "int"}, {name: "Name", type: "string"},
        {name: "IsBasicLaw", type: "bit"}, {name: "IsFavoriteLaw", type: "bit"}, {name: "IsBudgetLaw", type: "bit"},
        {name: "PublicationDate", type: "datetime"}, {name: "LatestPublicationDate", type: "datetime"},
        {name: "LawValidityID", type: "int"}, {name: "LawValidityDesc", type: "string"},
        {name: "ValidityStartDate", type: "datetime"}, {name: "ValidityStartDateNotes", type: "string"},
        {name: "ValidityFinishDate", type: "datetime"}, {name: "ValidityFinishDateNotes", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_IsraelLawName": [
        {name: "ID", type: "int"}, {name: "IsraelLawID", type: "int"}, {name: "LawID", type: "int"},
        {name: "LawTypeID", type: "int"}, {name: "Name", type: "string"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_IsraelLawMinistry": [
        {name: "ID", type: "int"}, {name: "IsraelLawID", type: "int"}, {name: "GovMinistryID", type: "int"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_IsraelLawClassificiation": [
        {name: "ID", type: "int"}, {name: "IsraelLawID", type: "int"}, {name: "ClassificiationID", type: "int"},
        {name: "ClassificiationDesc", type: "string"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_IsraelLawBinding": [
        {name: "ID", type: "int"}, {name: "IsraelLawID", type: "int"}, {name: "IsraelLawReplacedID", type: "int"},
        {name: "LawID", type: "int"}, {name: "LawTypeID", type: "int"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_LawBinding": [
        {name: "ID", type: "int"}, {name: "LawID", type: "int"}, {name: "LawTypeID", type: "int"},
        {name: "IsraelLawID", type: "int"}, {name: "ParentLawID", type: "int"}, {name: "LawParentTypeID", type: "int"},
        {name: "BindingType", type: "int"}, {name: "BindingTypeDesc", type: "string"}, {name: "PageNumber", type: "string"},
        {name: "AmendmentType", type: "int"}, {name: "AmendmentTypeDesc", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentIsraelLaw": [
        {name: "Id", type: "int"}, {name: "IsraelLawID", type: "int"}, {name: "GroupTypeID", type: "int"},
        {name: "GroupTypeDesc", type: "String"}, {name: "ApplicationID", type: "int"},
        {name: "ApplicationDesc", type: "String"}, {name: "FilePath", type: "String"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_Law": [
        {name: "LawID", type: "int"}, {name: "TypeID", type: "int"}, {name: "TypeDesc", type: "string"},
        {name: "SubTypeID", type: "int"}, {name: "SubTypeDesc", type: "string"}, {name: "KnessetNum", type: "int"},
        {name: "Name", type: "string"}, {name: "PublicationDate", type: "datetime"},
        {name: "PublicationSeriesID", type: "int"}, {name: "PublicationSeriesDesc", type: "string"},
        {name: "MagazineNumber", type: "string"}, {name: "PageNumber", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentLaw": [
        {name: "ID", type: "int"}, {name: "LawID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_SecondaryLaw": [
        {name: "Id", type: "Int"}, {name: "KnessetNum", type: "Int"}, {name: "Name", type: "String"},
        {name: "CompletionCauseID", type: "Int"}, {name: "CompletionCauseDesc", type: "String"},
        {name: "PostponementReasonID", type: "Int"}, {name: "PostponementReasonDesc", type: "String"},
        {name: "KnessetInvolvementID", type: "Int"}, {name: "KnessetInvolvementDesc", type: "String"},
        {name: "CommitteeID", type: "Int"}, {name: "PublicationSeriesID", type: "Int"},
        {name: "PublicationSeriesDesc", type: "String"}, {name: "MagazineNumber", type: "String"},
        {name: "PageNumber", type: "String"}, {name: "PublicationDate", type: "DateTime"},
        {name: "MajorAuthorizingLawID", type: "Int"}, {name: "CommitteeReceivedDate", type: "DateTime"},
        {name: "CommitteeApprovalDate", type: "DateTime"}, {name: "ApprovalDateWithoutDiscussion", type: "DateTime"},
        {name: "IsAmmendingLawOriginal", type: "Boolean"}, {name: "ClassificationID", type: "Int"},
        {name: "ClassificationDesc", type: "String"}, {name: "IsEmergency", type: "Boolean"},
        {name: "SecretaryReceivedDate", type: "DateTime"}, {name: "PlenumApprovalDate", type: "DateTime"},
        {name: "TypeID", type: "Int"}, {name: "TypeDesc", type: "String"}, {name: "StatusID", type: "Int"},
        {name: "StatusName", type: "String"}, {name: "IsCurrent", type: "Boolean"},
        {name: "LastUpdatedDate", type: "DateTime"}
    ],
    "KNS_SecLawRegulator": [
        {name: "Id", type: "Int"}, {name: "SecondaryLawID", type: "Int"}, {name: "RegulatorTypeID", type: "Int"},
        {name: "RegulatorTypeDesc", type: "String"}, {name: "RegulatorID", type: "Int"},
        {name: "RegulatorDesc", type: "String"}, {name: "LastUpdatedDate", type: "DateTime"}
    ],
    "KNS_SecLawAuthorizingLaw": [
        {name: "Id", type: "Int"}, {name: "AuthorizingLawID", type: "Int"}, {name: "SecondaryLawID", type: "Int"},
        {name: "LastUpdatedDate", type: "DateTime"}
    ],
    "KNS_DocumentSecondaryLaw": [
        {name: "Id", type: "Int"}, {name: "SecondaryLawId", type: "Int"}, {name: "GroupTypeID", type: "Byte"},
        {name: "GroupTypeDesc", type: "String"}, {name: "ApplicationID", type: "Byte"},
        {name: "ApplicationDesc", type: "String"}, {name: "FilePath", type: "String"},
        {name: "LastUpdatedDate", type: "DateTimeOffset"}
    ],
    "KNS_SecToSecBinding": [
        {name: "Id", type: "Int"}, {name: "SecChildID", type: "Int"}, {name: "SecChildTypeID", type: "Int"},
        {name: "SecParentID", type: "Int"}, {name: "SecParentTypeID", type: "Int"}, {name: "SecMainID", type: "Int"},
        {name: "SecMainTypeID", type: "Int"}, {name: "BindingTypeID", type: "Int"},
        {name: "BindingTypeDesc", type: "String"}, {name: "IsTempLegislation", type: "Boolean"},
        {name: "IsSecondaryAmendment", type: "Boolean"}, {name: "CorrectionNumber", type: "Int"},
        {name: "AmendmentTypeID", type: "Int"}, {name: "AmendmentTypeDesc", type: "String"},
        {name: "ParagraphNumber", type: "String"}, {name: "LastUpdatedDate", type: "DateTime"}
    ],
    "KNS_Agenda": [
        {name: "ID", type: "int"}, {name: "Number", type: "int"}, {name: "ClassificationID", type: "int"},
        {name: "ClassificationDesc", type: "String"}, {name: "LeadingAgendaID", type: "Int"},
        {name: "KnessetNum", type: "Int"}, {name: "Name", type: "String"}, {name: "SubTypeID", type: "Int"},
        {name: "SubTypeDesc", type: "string"}, {name: "StatusID", type: "int"}, {name: "InitiatorPersonID", type: "int"},
        {name: "GovRecommendationID", type: "int"}, {name: "GovRecommendationDesc", type: "String"},
        {name: "PresidentDecisionDate", type: "datetime"}, {name: "PostopenmentReasonID", type: "Int"},
        {name: "PostopenmentReasonDesc", type: "string"}, {name: "CommitteeID", type: "int"},
        {name: "RecommendCommitteeID", type: "int"}, {name: "MinisterPersonID", type: "int"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentAgenda": [
        {name: "ID", type: "int"}, {name: "AgendaID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_Query": [
        {name: "ID", type: "int"}, {name: "Number", type: "int"}, {name: "KnessetNum", type: "int"},
        {name: "Name", type: "string"}, {name: "TypeID", type: "int"}, {name: "TypeDesc", type: "string"},
        {name: "StatusID", type: "int"}, {name: "PersonID", type: "int"}, {name: "GovMinistryID", type: "int"},
        {name: "SubmitDate", type: "datetime"}, {name: "ReplyMinisterDate", type: "datetime"},
        {name: "ReplyDatePlanned", type: "datetime"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentQuery": [
        {name: "ID", type: "int"}, {name: "QueryID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_Committee": [
        {name: "ID", type: "int"}, {name: "Name", type: "string"}, {name: "CategoryID", type: "int"},
        {name: "CategoryDesc", type: "string"}, {name: "KnessetNum", type: "int"}, {name: "CommitteeTypeID", type: "int"},
        {name: "CommitteeTypeDesc", type: "string"}, {name: "Email", type: "string"}, {name: "StartDate", type: "datetime"},
        {name: "FinishDate", type: "datetime"}, {name: "AdditionalTypeID", type: "int"},
        {name: "AdditionalTypeDesc", type: "string"}, {name: "ParentCommitteeID", type: "int"},
        {name: "CommitteeParentName", type: "string"}, {name: "IsCurrent", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_CommitteeSession": [
        {name: "ID", type: "int"}, {name: "Number", type: "int"}, {name: "KnessetNum", type: "int"},
        {name: "TypeID", type: "int"}, {name: "TypeDesc", type: "string"}, {name: "SessionSubTypeId", type: "int"},
        {name: "SessionSubTypeDesc", type: "string"}, {name: "CommitteeID", type: "int"},
        {name: "Location", type: "nstring"}, {name: "SessionUrl", type: "nstring"}, {name: "BroadcastUrl", type: "nstring"},
        {name: "StartDate", type: "datetime"}, {name: "FinishDate", type: "datetime"}, {name: "Note", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_CmtSessionItem": [
        {name: "ID", type: "int"}, {name: "ItemID", type: "int"}, {name: "CommitteeSessionID", type: "int"},
        {name: "Ordinal", type: "int"}, {name: "StatusID", type: "int"}, {name: "Name", type: "string"},
        {name: "ItemTypeID", type: "int"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentCommitteeSession": [
        {name: "ID", type: "int"}, {name: "CommitteeSessionID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_JointCommittee": [
        {name: "ID", type: "int"}, {name: "CommitteeID", type: "int"}, {name: "ParticipantCommitteeID", type: "int"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_BroadcastCommitteSession": [
        {name: "Id", type: "Int"}, {name: "BroadcastId", type: "Int"}, {name: "BroadcastUrl", type: "String"}
    ],
    "KNS_CmtSiteCode": [
        {name: "ID", type: "int"}, {name: "KnsID", type: "int"}, {name: "SiteId", type: "int"}
    ],
    "KNS_PlenumSession": [
        {name: "ID", type: "int"}, {name: "Number", type: "int"}, {name: "KnessetNum", type: "int"},
        {name: "Name", type: "string"}, {name: "StartDate", type: "datetime"}, {name: "FinishDate", type: "datetime"},
        {name: "IsSpecialMeeting", type: "bit"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_PlmSessionItem": [
        {name: "ID", type: "int"}, {name: "ItemID", type: "int"}, {name: "PlenumSessionID", type: "int"},
        {name: "ItemTypeID", type: "int"}, {name: "ItemTypeDesc", type: "string"}, {name: "Ordinal", type: "int"},
        {name: "Name", type: "string"}, {name: "StatusID", type: "int"}, {name: "IsDiscussion", type: "int"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_DocumentPlenumSession": [
        {name: "ID", type: "int"}, {name: "PlenumSessionID", type: "int"}, {name: "GroupTypeID", type: "tinyint"},
        {name: "GroupTypeDesc", type: "string"}, {name: "ApplicationID", type: "tinyint"},
        {name: "ApplicationDesc", type: "string"}, {name: "FilePath", type: "string"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_PlenumVote": [
        {name: "VoteID", type: "Int32"}, {name: "VoteDateTime", type: "DateTimeOffset"}, {name: "SessionID", type: "Int32"},
        {name: "ItemID", type: "Int32"}, {name: "Ordinal", type: "Int32"}, {name: "VoteMethodID", type: "Int32"},
        {name: "VoteMethodDesc", type: "String"}, {name: "VoteStatusCode", type: "Int32"},
        {name: "VoteStatusDesc", type: "String"}, {name: "VoteTitle", type: "String"}, {name: "VoteSubject", type: "String"},
        {name: "IsNoConfidenceInGov", type: "Boolean"}, {name: "LastModified", type: "DateTimeOffset"},
        {name: "ForOptionID", type: "Int32"}, {name: "ForOptionDesc", type: "String"},
        {name: "AgainstOptionID", type: "Int32"}, {name: "AgainstOptionDesc", type: "String"}
    ],
    "KNS_PlenumVoteResult": [
        {name: "Id", type: "Int32"}, {name: "MKID", type: "Int32"}, {name: "VoteID", type: "Int32"},
        {name: "VoteDate", type: "DateTimeOffset"}, {name: "ResultCode", type: "Int32"},
        {name: "ResultDesc", type: "String"}, {name: "LastModified_DateTime", type: "DateTimeOffset"}
    ],
    "KNS_Person": [
        {name: "ID", type: "Int"}, {name: "LastName", type: "string"}, {name: "FirstName", type: "string"},
        {name: "GenderID", type: "Int"}, {name: "GenderDesc", type: "string"}, {name: "Email", type: "string"},
        {name: "IsCurrent", type: "Bit"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_Position": [
        {name: "ID", type: "Int"}, {name: "Description", type: "string"}, {name: "GenderID", type: "Int"},
        {name: "GenderDesc", type: "string"}, {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_PersonToPosition": [
        {name: "ID", type: "int"}, {name: "PersonID", type: "int"}, {name: "PositionID", type: "int"},
        {name: "KnessetNum", type: "int"}, {name: "GovMinistryID", type: "int"}, {name: "GovMinistryName", type: "string"},
        {name: "DutyDesc", type: "string"}, {name: "FactionID", type: "int"}, {name: "FactionName", type: "string"},
        {name: "GovernmentNum", type: "int"}, {name: "CommitteeID", type: "int"}, {name: "CommitteeName", type: "string"},
        {name: "StartDate", type: "datetime"}, {name: "FinishDate", type: "datetime"}, {name: "IsCurrent", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_MkSiteCode": [
        {name: "ID", type: "int"}, {name: "KnsID", type: "int"}, {name: "SiteId", type: "int"}
    ],
    "KNS_Faction": [
        {name: "ID", type: "int"}, {name: "Name", type: "string"}, {name: "KnessetNum", type: "int"},
        {name: "StartDate", type: "datetime"}, {name: "FinishDate", type: "datetime"}, {name: "IsCurrent", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_KnessetDates": [
        {name: "ID", type: "int"}, {name: "KnessetNum", type: "int"}, {name: "Name", type: "string"},
        {name: "Assembly", type: "int"}, {name: "Plenum", type: "int"}, {name: "PlenumStart", type: "datetime"},
        {name: "PlenumFinish", type: "datetime"}, {name: "IsCurrent", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_GovMinistry": [
        {name: "ID", type: "int"}, {name: "Name", type: "string"}, {name: "CategoryID", type: "int"},
        {name: "CategoryName", type: "string"}, {name: "GovID", type: "int"}, {name: "IsActive", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ],
    "KNS_ItemType": [
        {name: "ID", type: "int"}, {name: "Desc", type: "string"}, {name: "TableName", type: "string"}
    ],
    "KNS_Status": [
        {name: "ID", type: "int"}, {name: "Desc", type: "string"}, {name: "TypeID", type: "Int"},
        {name: "TypeDesc", type: "string"}, {name: "OrderTransition", type: "int"}, {name: "IsActive", type: "bit"},
        {name: "LastUpdatedDate", type: "datetime"}
    ]
};
