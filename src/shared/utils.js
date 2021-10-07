export default {
    formatTimeAgo: function(timestamp, locale) {

        const msPerMinute = 60 * 1000;
        const msPerHour = msPerMinute * 60;
        const msPerDay = msPerHour * 24;
        const msPerMonth = msPerDay * 30;
        const msPerYear = msPerDay * 365;
        const msPerDecade = msPerYear * 10;


        const current = Date.now();
        const elapsed = current - timestamp;

        const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

        if (elapsed < msPerMinute) {
                return rtf.format(-Math.floor(elapsed/1000), 'seconds');   
        }

        else if (elapsed < msPerHour) {
                return rtf.format(-Math.floor(elapsed/msPerMinute), 'minutes'); 
        }

        else if (elapsed < msPerDay) {
                return rtf.format(-Math.floor(elapsed/msPerHour), 'hours');  
        }

        else if (elapsed < msPerMonth) {
            return rtf.format(-Math.floor(elapsed/msPerDay), 'days');  
        }

        else if (elapsed < msPerYear) {
            return rtf.format(-Math.floor(elapsed/msPerMonth), 'months');  
        }

        else if (elapsed < msPerDecade) {
            return rtf.format(-Math.floor(elapsed/msPerYear), 'years');  
        }

        else {
            return new Date(timestamp).toLocaleDateString(locale);   
        }
    }
}


