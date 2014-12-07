/**
 * Created by Jamil on 12/7/2014.
 */

// gets stored settings
function getSettings() {

    defaults = {
        trade_type: "0",
        tol_type: "0",
        prof_type: "2",
        comm_ps: "0.000",
        comm_pt: "0.00",
        max_comm: "0.000",
        max_comm_type: "p",
        comm_type: "1"
    };



    // Trade type
    trade_type = defaults.trade_type;
    if($.locSto("trade_type") != null )
        trade_type = $.locSto("trade_type");

    if(trade_type == "1")
        $("[id$=_result_denom]").html("Cover");
    else
        $("[id$=_result_denom]").html("Sell");

    toggleButton("type_buttons",trade_type);


    // Tolerance Type
    tol_type = defaults.tol_type;
    if($.locSto("tol_type") != null )
        tol_type = $.locSto("tol_type");

    toggleButton("tol_buttons",tol_type);

    // Profit Type
    prof_type = defaults.prof_type;
    if($.locSto("prof_type") != null )
        trade_type = $.locSto("prof_type");

    toggleButton("prof_buttons",prof_type);

    // Profit Type
    comm_type = defaults.comm_type;
    if($.locSto("comm_type") != null )
        comm_type = $.locSto("comm_type");

    toggleButton("comm_buttons",comm_type);

}

// Toggles the buttons on click event
function toggleButton(id, idx){
    i = parseInt(idx)+1;

    $("#"+id).find(".button").removeClass("active");
    $("#"+id+" .button:nth-child("+i+")").addClass("active");
}

// Calculates Profit and Loss based on provided information
function calculatePL(){

    // Elements
    ep = parseFloat($("#c_entry").val()); // Entry Price
    ps = parseFloat($("#c_position").val()); // Position size
    lt = parseFloat($("#c_tol").val()); // Loss Tolerance
    dp = parseFloat($("#c_profit").val()); // Desired profit

    lt_type = $("#tol_buttons").find(".active").first().attr("data-value");
    pr_type = $("#prof_buttons").find(".active").first().attr("data-value");

    cps=0.00;
    cpt=0.00;
    max_comm = 0.0;
    max_comm_type = "p";
    if($.locSto("comm_ps") != null)
        cps = parseFloat($.locSto("comm_ps"));

    if($.locSto("comm_pt") != null)
        cpt = parseFloat($.locSto("comm_pt"));

    if($.locSto("max_comm") != null)
        max_comm = parseFloat($.locSto("max_comm"));

    if($.locSto("max_comm_type") != null)
        max_comm_type = $.locSto("max_comm_type");


    // Defaults
    r = {
        entry_value: 0.0000,
        entry_comm: 0.0000,
        loss_exit_price: 0.0000,
        loss_exit_value: 0.0000,
        loss_total:0.0000,
        loss_exit_comm: 0.0000,
        profit_exit_price: 0.0000,
        profit_exit_value: 0.0000,
        profit_total:0.0000,
        profit_exit_comm: 0.0000
    };

    multiplier = 1.00;
    if($("#type_buttons").find(".active").first().attr("data-value") == "1")
        multiplier = -1.00;

    // Entry Value
    r.entry_value = ep*ps;

    r.entry_comm = calculateCommission(r.entry_value, max_comm_type, max_comm, ps, cps, cpt);

    // Loss Calculation
    l_val = 0.00;
    if(lt_type == "0"){
        l_val = r.entry_value*lt/100;
    }
    else if(lt_type == "1"){
        l_val = lt;
    }
    else if(lt_type == "2"){
        l_val = lt*ps;
    }
    console.log("lt-type: "+lt_type+" - l val: "+l_val.toFixed(4));

    r.loss_total = l_val;
    r.loss_exit_value = (r.entry_value-l_val*multiplier);
    r.loss_exit_price = r.loss_exit_value/ps;

    r.loss_exit_comm = calculateCommission(r.loss_exit_value, max_comm_type, max_comm, ps, cps, cpt);


    // Profit Calculation
    p_val = 0.00;
    if(pr_type == "0"){
        p_val = r.entry_value*dp/100;
    }
    else if(pr_type == "1"){
        p_val = dp;
    }
    else if(pr_type == "2"){
        p_val = dp*ps;
    }
    console.log("pr-type: "+pr_type+" - p val: "+p_val.toFixed(4));

    r.profit_total = p_val;
    r.profit_exit_value = (r.entry_value+p_val*multiplier);
    r.profit_exit_price = r.profit_exit_value/ps;

    r.profit_exit_comm = calculateCommission(r.profit_exit_value, max_comm_type, max_comm, ps, cps, cpt);



    console.log(r);




    return r;

}

function renderPL(){

    console.log("render profit & loss");
    flag = true;

    $("input").each(function(){

        v = $(this).val();

        if(v == "" && !v.match(/\d+(\.\d+)*/) )
            flag = false;


    });

    if(flag){
        r = calculatePL();

        // Elements
        p_exit_price = $("#profit_result");
        l_exit_price = $("#loss_result");
        pos_value = $("#entry_value");
        entry_comm = $("#entry_comm");
        loss_pos_value = $("#loss_position_value");
        loss_value = $("#loss_amount");
        profit_pos_value = $("#profit_position_value");
        profit_value = $("#profit_amount");

        show_comm = $("#comm_buttons").find(".active").attr("data-value");

        p_exit_price.html(r.profit_exit_price.toFixed(4));
        l_exit_price.html(r.loss_exit_price.toFixed(4));
        pos_value.html(r.entry_value.toFixed(4));
        entry_comm.html(r.entry_comm.toFixed(4));
        loss_pos_value.html(r.loss_exit_value.toFixed(4));
        profit_pos_value.html(r.profit_exit_value.toFixed(4));

        if(show_comm == "1"){
            loss_value.html((r.loss_total+r.loss_exit_comm).toFixed(4));
            profit_value.html((r.profit_total- r.profit_exit_comm).toFixed(4));
        }
        else{
            loss_value.html((r.loss_total).toFixed(4));
            profit_value.html((r.profit_total).toFixed(4));
        }





    }

}

function calculateCommission(value, type, max, ps, cps, cpt){

    console.log(arguments);

    // Entry commission
    mc = 0.00;
    switch (type){
        case 'p': mc= value * max/100;
            break;
        default: mc = max;
    }

    comm = ps*cps+cpt;
    console.log( mc + " - "+ comm);
    if(comm >= mc)
        comm = mc;



    return comm;

}