/**
 * Created by Jamil on 12/7/2014.
 */

(function($) {
    $.locSto = function(key, value){
        // Read
        if(arguments.length == 1) {
            return localStorage.getItem(key);
        }
        // Write
        else if( arguments.length == 2){

            console.log(value);
            if (value == "del")
                localStorage.removeItem("key");
            else
                localStorage.setItem(key,value);

            return true;
        }
        else {

            console.log("Invalid number of arguments");
            return false;
        }
    };


}(jQuery));
