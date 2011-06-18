// JScript File

function create_card_control(card_data) {
    if (!card_data || card_data.length<=0) return;
    
    for(i=0;i<card_data.length;i++) {
        console.log(card_data[i]);
    }
}

function do_layout() {
    
}

$(function() {
    $(window).resize(do_layout);
    //create div
    card_data = [];
    for(i=0;i<10;i++) {
        card_data.push(i);
    }
    
    create_card_control(card_data);
})

