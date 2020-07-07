var REFRESH_ID = 1010003;
var PING_ID = 11111111;
//
var REPORT_RESPOND_ID = 2000000002;
var TERMINATE_CALL_RESPOND_ID = 2000000001;

var LOGIN_RESPONSE_ID = 1000;
var LOGOUT_RESPOND_ID = 1003;
var AGENT_END_CALL_RESPOND_ID = 1009;
var RELOAD_AGENT_STATUS_RESPONSE_ID = 1020;
var CHANGE_AGENT_STATUS_RESPOND_ID = 1027;
var UNHOLD_RESPOND_ID = 1028;
var HOLD_RESPOND_ID = 1029;
var MUTE_RESPOND_ID = 1030;
var UNMUTE_RESPOND_ID = 1031;
var RING_AGENT_RESPOND_ID = 1038;
var AGENT_ANSWER_RESPOND_ID = 1039;
var OUT_CALL_RESPONSE_ID = 1055;
var ERROR_CALL_RESPONSE_ID = 1045;
var HOLD_OUTCALL_RESPONSE_ID = 1084;
var UNHOLD_OUTCALL_RESPONSE_ID = 1085;
var TRANSFER_TO_ACD_REQUEST_ID = 2052;
var TRANFER_TO_ACD_RESPONSE = 1116;

//chuyen gia
var GET_PROF_LIST_RESPONSE_ID = 1105;
var GET_PROF_GROUP_LIST_RESPONSE_ID = 1503301106;
var TRANSFER_TO_PROFESSOR_REQUEST_ID = 2053;
var TRANSFER_TO_PROFESSOR_GROUP_REQUEST_ID = 1504062053;
var RECEIVE_PROFESSOR_LIST_REQUEST_ID = 2069;
var RECEIVE_PROFESSOR_GROUP_LIST_REQUEST_ID = 1504062069;
var TRANFER_PROFESS_RESPONE = 1505231619;

var TERMINATE_REQUEST_ID = 2009;
var HOLD_REQUEST_ID = 2015;
var UN_HOLD_REQUEST_ID = 2016;
var UNMUTE_REQUEST_ID = 2017;
var MUTE_REQUEST_ID = 2018;
var REMOVE_AGENT_REQUEST_ID = 2019;
var OUT_CALL_REQUEST_ID = 2032;
var TERMINATE_CALL_OUT_REQUEST_ID = 2033;
var HOLD_OUTCALL_REQUEST_ID = 2055;
var UN_HOLD_OUTCALL_REQUEST_ID = 2056;
var LOG_OUT_REQUEST_ID = 2014;
var AGENT_SEARCH_AGENT_REQUEST_ID = 1410122081;
var AGENT_SEARCH_AGENT_RESPONSE_ID = 1410121118;
var TRANSFER_AGENT_TO_AGENT_CONFIRM_REQUEST_ID = 1410122076;
var TRANSFER_AGENT_TO_AGENT_CONFIRM_RESPONSE_ID = 1410121123;

var SHOW_MESSAGEBOX_REQUEST_ID = 1410122077;

var ENABLE_VOICE_CHANNEL_REQUEST = 1511232001;
var ENABLE_VOICE_CHANNEL_RESPONSE = 1511231001;
var DISABLE_VOICE_CHANNEL_REQUEST = 1511232002;
var DISABLE_VOICE_CHANNEL_RESPONSE = 1511231002;
var CONFIRM_ENABLE_VOICE_CHANNEL_REQUEST = 1511232003;
var CONFIRM_ENABLE_VOICE_CHANNEL_RESPONSE = 1511231003;
var CHANGE_DEVICE_TYPE_REQUEST = 1511242004;
var CHANGE_DEVICE_TYPE_RESPONSE = 1511241004;

var CHANGE_AGENT_CHAT_STATUS_REQUEST_ID = 1505272094;
var CHANGE_AGENT_CALL_STATUS_REQUEST_ID = 1505272093;
var CHANGE_AGENT_CHAT_STATUS_RESPOND_ID = 1505271128;

var SURVEY_VOICE_REQUEST_ID = 1702242001;
var SURVEY_VOICE_RESPONSE_ID = 1702241001;

var GET_QUEUE_INFO_REQUEST_ID = 1512072001;
var GET_QUEUE_INFO_RESPONSE_ID = 1512071001;

var GET_AGENT_INFO_REQUEST_ID = 1512112001;
var GET_AGENT_INFO_RESPONSE_ID = 1512111001;

var CHANGE_AGENT_TICKET_STATUS_REQUEST_ID = 1602202001;
var CHANGE_AGENT_TICKET_STATUS_RESPOND_ID = 1602201001;

var TICKET_CREATE_VOICE_IN_RESPOND_ID = 1603011001;
var CALLER_INFO_VOICE_IN_RESPOND_ID = 1603101002;

var INTERNAL_CALL_RING_RESPONSE_ID = 1607111001;
var INTERNAL_CALL_ANSWER_RESPONSE_ID = 1607111003;
var INTERNAL_CALL_END_RESPONSE_ID = 1607111002;

var GET_SELF_AGENT_INFO_REQUEST_ID = 1608082001;
var GET_SELF_AGENT_INFO_RESPONSE_ID = 1608081001;

var CALL_STATUS_MONITOR_RESPONSE_ID = 1609301001;
var INVITE_REQUEST_ID = 2007;
var INVITE_RESPOND_ID = 1005;
var TRANSFER_REQUEST_ID= 2010;
var SPY_REQUEST_ID = 2011;
var SPY_RESPOND_ID = 1008;
var TERMINATE_RESPOND_ID = 1006;
var TRANSFER_AGENT_TO_AGENT_RESPOND_ID = 1410121119;
var CAMPAIGN_POPUP_OPEN_RESPOND_ID = 1609231001;

//Chat
var AGENT_LOGIN = 2;
var LOGOUT = 3;
var HAVE_MESSAGE = 4; //
var MESSAGE = 5; //khi send message
var SEND_FILE = 20;
var RECEIVE_FILE = 21;
var UPDATE_VISITOR_INFO = 41;
var AGENT_NOT_RESPONSE_INCOMING_CHAT = 42;
var AGENT_RESPONSE_INCOMING_CHAT = 43;
var AGENT_GET_CONV_HISTORY = 44;
var AGENT_GET_MESSAGE_HISTORY = 45;
var AGENT_END_CONVERSATION = 49;
var AGENT_FRIEND_LIST = 50;
var AGENT_CREATE_CONVERSATION = 51;
var TRANSFER_CHAT_TO_AGENT = 54;
var TRANSFER_CHAT_TO_AGENT_RESULT = 55;
var RESPONSE_TRANSFER_CHAT_TO_AGENT = 56;
var FRIEND_LIST_UPDATE = 62;
var CONVERSATION_UPDATE = 63;
var AGENT_LEFT_CONVERSATION = 64;
var CUSTOMER_END_CONVERSATION = 69;
var AGENT_END_CONVERSATION_CUSTOMER = 71;//agent ket thuc hoi thoai
var AGENT_HAS_CUSTOMER = 77;
var NOTIFY_TYPING = 88;
var LIKE = 89;
var DISLIKE = 90;
var AGENT_LOGOUT = 95;
var AGENT_RESUME_RESPONSE = 99;
var END_INTERNAL_CHAT = 103;
var GET_INTERNAL_HISTORY = 104;
var GET_CHAT_ONLINE_INFO = 102;
var RESPONSE_TRANSFER_CHAT_TO_AGENT_RESULT = 105;
var UPDATE_VISITOR_VISIT_PATH_URL = 107;
var CUSTOMER_PLATFORM_INFO = 108;
var AGENT_UPDATE_VISITOR_INFO = 109;
var TICKET_CREATED_RESPONSE = 111;
var AZSTACK_CALL_REQUEST = 112;
var AZSTACK_CALL_RESPONSE = 113;
var AGENT_ACTIVE_CONVERSATION = 114;
var NOTIFY_TICKET = 115;
var NOTIFY_STOP_TYPING = 116;
var GET_SELF_AGENT_CHAT_ONLINE_INFO = 117;
var AGENT_GET_INTERNAL_CONV_HISTORY = 118;
var AGENT_REQUEST_ACTIVE_CONVERSATION = 119;


var REPORT_TYPE_OVERVIEW = 0;
var REPORT_TYPE_TICKET = 1;
var REPORT_TYPE_CHAT = 2;
var REPORT_TYPE_VOICE = 3;
var REPORT_TYPE_VOICEMAIL = 4;
var REPORT_TYPE_SMS = 5;
var REPORT_TYPE_AGENT = 6;
var REPORT_TYPE_OUTBOUND = 7;
var REPORT_TYPE_CAMPAIGN = 8;


var ERROR_CODE_CALL_NOT_FOUND = "IPCCERR0000";
var ERROR_CODE_AGENT_BUSY = "IPCCERR0001";
var ERROR_CODE_AGENT_NOT_FOUND = "IPCCERR0002";
var ERROR_CODE_AGENT_MUTING_OR_HOLDING = "IPCCERR0003";
var ERROR_CODE_AGENT_NOT_MUTE = "IPCCERR0004";
var ERROR_CODE_AGENT_NOT_HOLD = "IPCCERR0005";
var ERROR_CODE_CUSTOMER_NOT_FOUND = "IPCCERR0006";
var ERROR_CODE_NUMBER_OF_PARAMS_WRONG = "IPCCERR0007";
var ERROR_CODE_HOLD_AT_RINGING = "IPCCERR0008";
var ERROR_CODE_MUTE_AT_RINGING = "IPCCERR0009";
var ERROR_CODE_MUTE_HOLD_AT_SPY = "IPCCERR0010";
var ERROR_CODE_CALL_MUTE = "IPCCERR0011";
var ERROR_CODE_PERMISSION_DENY_AT_SPY = "IPCCERR0012";
var ERROR_CODE_HOLD_CALL_IN_HOLDING = "IPCCERR0013";
var ERROR_CODE_REDIRECT_TO_AREAS = "IPCCERR0014";
var ERROR_CODE_CALL_NOT_COACH = "IPCCERR0015";
var ERROR_CODE_CANT_PROCESS_WHEN_COACHING = "IPCCERR0016";
var ERROR_CODE_CANT_COACHCALL = "IPCCERR0017";

var DEVICE_BROWSER = 1;
var DEVICE_SOFTPHONE = 2;
var DEVICE_OUT = 4;

var USER_ROLE_ADMIN = 1;
var USER_ROLE_SUB_ADMIN = 5;
var USER_ROLE_AGENT = 2;
var USER_ROLE_SUPER = 4;
var USER_ROLE_EXTENDSION = 6;

//status
var RINGING = "RINGING";
var ANSWERING = "ANSWERING";
var HOLDING = "HOLDING";
var WAITING = "WAITING";
var MUTING = "MUTING";


//var API_SERVER = "https://3c-capi.mobifone.vn";
var API_SERVER = "https://demo.adfilex.vn/";