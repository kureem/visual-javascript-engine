package framework.components;

import jsweet.lang.Date;
import jsweet.lang.JSON;
import jsweet.lang.Object;

public class Util {
	
	public final static String[] DAYS =new String[] {"Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"};
	
	
	
	
	public final static String[] SHORT_DAYS =  new String[] {"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"};
	
	private final static String[] LONG_DAYS =  new String[] {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
	
	
	private final static String[] MONTHS = new String[] {"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};
	
	private final static int[] DAYS_IN_MONTH = new int[] {31,28,31,30,31,30,31,31,30,31,30,31};
	
	
	public final static Integer MIN_HOUR = 6;
	
	public final static Integer MAX_HOUR = 21;
	
	
	public final static Integer ROW_HEIGHT_PX = 28;
	
	
	public final static String COLOR_DISPO = "#cfebfe";
	
	public final static String COLOR_ABS = "#425c5a";
	
	
	public static Object getSemaineType() {
		String s = "{\r\n" + 
				"  \"config\": {\r\n" + 
				"    \"Lundi\": {\r\n" + 
				"      \"dispo\": [\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"12:00\",\r\n" + 
				"          \"to\": \"14:00\"\r\n" + 
				"        }\r\n" + 
				"      ],\r\n" + 
				"      \"abs\": []\r\n" + 
				"    },\r\n" + 
				"    \"Mardi\": {\r\n" + 
				"      \"dispo\": [\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"11:30\",\r\n" + 
				"          \"to\": \"12:30\",\r\n" + 
				"          \"quantity\": \"4\"\r\n" + 
				"        }\r\n" + 
				"      ],\r\n" + 
				"      \"abs\": []\r\n" + 
				"    },\r\n" + 
				"    \"Mercredi\": {\r\n" + 
				"      \"dispo\": [\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"09:00\",\r\n" + 
				"          \"to\": \"10:00\",\r\n" + 
				"          \"quantity\": \"4\"\r\n" + 
				"        },\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"12:00\",\r\n" + 
				"          \"to\": \"14:30\",\r\n" + 
				"          \"quantity\": \"3\"\r\n" + 
				"        },\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"12:30\",\r\n" + 
				"          \"to\": \"13:30\",\r\n" + 
				"          \"quantity\": \"3\"\r\n" + 
				"        }\r\n" + 
				"      ],\r\n" + 
				"      \"abs\": []\r\n" + 
				"    },\r\n" + 
				"    \"Jeudi\": {\r\n" + 
				"      \"dispo\": [],\r\n" + 
				"      \"abs\": [\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"10:00\",\r\n" + 
				"          \"to\": \"11:00\",\r\n" + 
				"          \"quantity\": 1\r\n" + 
				"        }\r\n" + 
				"      ]\r\n" + 
				"    },\r\n" + 
				"    \"Vendredi\": {\r\n" + 
				"      \"dispo\": [\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"15:30\",\r\n" + 
				"          \"to\": \"17:00\",\r\n" + 
				"          \"quantity\": \"4\"\r\n" + 
				"        },\r\n" + 
				"        {\r\n" + 
				"          \"from\": \"10:30\",\r\n" + 
				"          \"to\": \"14:00\"\r\n" + 
				"        }\r\n" + 
				"      ],\r\n" + 
				"      \"abs\": []\r\n" + 
				"    },\r\n" + 
				"    \"Samedi\": {\r\n" + 
				"      \"dispo\": [],\r\n" + 
				"      \"abs\": []\r\n" + 
				"    }\r\n" + 
				"  },\r\n" + 
				"  \"until\": \"2020-12-27T00:00:00.000Z\"\r\n" + 
				"}";
		
		Object obj = (Object)JSON.parse(s);
		return obj;
		
	}
	
	public static double getDaysInMonth(Date date) {
		if(date.getMonth() ==11){
			return 31;
		}else {
			//
			Date tmp = Util.addDays(new Date(date.getFullYear(),date.getMonth() + 1,date.getDate(),0,0,0,0),-1);
			return tmp.getDate();
		}
	}
	
	public static Date getFirstDateOfMonth(Date date) {
		return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
	}
	
	public static Date getLastDateOfMonth(Date date) {
		//first day of next month
		if(date.getMonth() == 11) {
			return new Date(date.getFullYear(),date.getMonth(),31,0,0,0,0);
		}else {
			Date tmp = new Date(date.getFullYear(),date.getMonth() + 1,1,0,0,0,0);
			return Util.addDays(tmp, -1);
		}
	}
	
	public static String to2num(int val) {
		if(val < 10) {
			return "0" + val;
		}else {
			return val + "";
		}
	}
	
	
	public static String getTime(int hour, int minute) {
		return to2num(hour) + ":" + to2num(minute);
	}

	
	public static int getHour(String time) {
		return Integer.parseInt(time.split(":")[0]);
	}
	
	public static int getMinute(String time) {
		return Integer.parseInt(time.split(":")[1]);
	}
	
	public static int countRows(String startTime, String endTime) {
		int fromHr = getHour(startTime);
		int toHr = getHour(endTime);
		int fromMin = getMinute(startTime);
		int toMin = getMinute(endTime);
		
		int whole = ((toHr - fromHr)*2)+1;
		
		if(fromMin == 30) {
			whole = whole -1;
		}
		
		if(toMin ==30) {
			whole = whole + 1;
		}
		return whole;
		
	}
	
	public static int countStartRowPosition(String startTime) {
		int hr = getHour(startTime);
		int minute = getMinute(startTime);
		int startRow = (hr - MIN_HOUR)*2 + 1;
		if(minute == 30) {
			startRow = startRow +1;
		}
		
		int top = (startRow* ROW_HEIGHT_PX) + 1;
		return top;
		
	}
	
	
	public static String formatDate(Date dt, String format) {
		//ddMMyyyy
		String dd = formatNum(dt.getDate());
		String MM = formatNum(dt.getMonth());
		String hh = formatNum(dt.getHours());
		String mm = formatNum(dt.getMinutes());
		String ss = formatNum(dt.getSeconds());
		String EE = SHORT_DAYS[(int)dt.getDay()];
		String EEEE = LONG_DAYS[(int)dt.getDay()];
		String yyyy = dt.getFullYear() + "";
		
		format = replace(format, "dd", dd);
		format = replace(format, "MM", MM);
		format = replace(format, "hh", hh);
		format = replace(format, "mm", mm);
		format = replace(format, "ss", ss);
		format = replace(format, "EE", EE);
		format = replace(format, "EEEE", EEEE);
		format = replace(format, "yyyy", yyyy);
		return format;
	}
	
	public static String replace(String text, String s, String with) {
		return text.replace(s, with);
	}
	
	public static String formatNum(double d) {
		return d<10? "0" + d: d + "";
	}
	
	public static double countStartColPosition(String day, double gutter, double colWidth) {
		int index = 0;
		for(String s : DAYS) {
			if(s == day) {
				break;
			}
			index++;
		}
		
		return (colWidth*index) + gutter;
		
		
	}
	
	public static Date addWeeks(Date dt, double weeks) {
		return addDays(dt,weeks*7);
	}
	
	public static Date addDays(Date dt, double days) {
		return addHour(dt, days*24);
	}
	
	public static Date addHour(Date dt, double hrs) {
		return addMinutes(dt, hrs*60);
	}
	
	public static Date addMinutes(Date dt, double minutes) {
		return addSeconds(dt, minutes*60);
	}
	
	public static Date addSeconds(Date dt, double secs) {
		return addMiliseconds(dt, secs*1000);
	}
	
	public static Date addMiliseconds(Date dt, double ms) {
		return new Date(dt.getTime() + ms);
	}
	
	
	
	public static boolean isSameDate(Date dt1, Date dt2) {
		return (dt1.getDate() == dt2.getDate()) && (dt1.getMonth() == dt2.getMonth()) &&  (dt1.getFullYear() == dt2.getFullYear());
	}
}
