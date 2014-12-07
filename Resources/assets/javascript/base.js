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
        else if(parent == "max_comm_buttons"){
            $.locSto("max_comm_type", $(this).attr("data-value"))
        }
        else if(parent == "settings_save_button"){
            $.locSto("comm_pt", $("#comm_per_trade").val());

            $.locSto("comm_ps", $("#comm_per_share").val());

            $.locSto("max_comm", $("#max_comm").val());

            $.locSto("max_comm_type", $("#max_comm_buttons").find(".active").first().attr("data-value"));
            TweenMax.to($("#settings"),0.75, {css:{top:$("#settings").height()*-1 -20}});
        }
        else if(parent == "about_close"){

            TweenMax.to($("#about"),0.75, {css:{top:$("#about").height()*-1 -20}});
        }

        renderPL();
    });

    $("input").blur(function(){
       renderPL();
    });

    $("#copy").find(".right").click(function(){
        offset = $("#wrapper").offset();
        console.log(offset); //debug
        TweenMax.to($("#settings"),0.75, {css:{top:offset.top}});
        //css:{top:0,marginTop:'auto',marginBottom:'auto'}

    });

    $("#copy").find(".left").click(function(){
        offset = $("#wrapper").offset();
        console.log(offset); //debug
        TweenMax.to($("#about"),0.75, {css:{top:offset.top}});
        //css:{top:0,marginTop:'auto',marginBottom:'auto'}
    });

});

$(function() {
    $( document ).tooltip({
        show: {
            //effect: "slideDown",
            delay: 1000
        },
        position: { my: "left+15 center", at: "right center" }
    });
});

