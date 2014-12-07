/**
 * Created by Jamil on 12/7/2014.
 */

$(document).ready(function(){
    getSettings();

    $(".button").click(function(){
        // Get parent id
        parent = $(this).parent().attr("id");

        $(this).siblings().removeClass("active");
        $(this).addClass("active");

        if(parent == "type_buttons"){
            if($(this).attr("data-value") == "1")
                $("[id$=_result_denom]").html("Cover");
            else
                $("[id$=_result_denom]").html("Sell");

            $.locSto("trade_type", $(this).attr("data-value"))
        }
        else if(parent == "tol_buttons"){
            $.locSto("tol_type", $(this).attr("data-value"))
        }
        else if(parent == "prof_buttons"){
            $.locSto("prof_type", $(this).attr("data-value"))
        }
        else if(parent == "comm_buttons"){
            $.locSto("comm_type", $(this).attr("data-value"))
        }

        renderPL();
    });

    $("input").blur(function(){
       renderPL();
    });

});

$(function() {
    $( document ).tooltip({
        show: {
            //effect: "slideDown",
            delay: 500
        },
        position: { my: "left+15 center", at: "right center" }
    });
});

