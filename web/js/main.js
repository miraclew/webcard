// JScript File
var top_bar_height = 30;

if (typeof console == "undefined" || typeof console.log == "undefined")
	console = { log: function() {} }

function CardControl(config) {
    this.clickable = false;
    for(var k in config) {
        this[k] = config[k];
    }
}
CardControl.prototype = {
    set_card_data: function (card_data) {
        if (!card_data || card_data.length<=0) return;
        var self = this;
        var comp = $('#'+this.render_to);
        comp.empty();
		
		for(i=0;i<card_data.length;i++) {
			var v = card_data[i] & 0x0F;
			var c = (card_data[i] & 0xF0) >> 4;			
			var child = '<div class="card" style="left: '+i*20+'px; background-position: -'+v*80+'px -' +c*105 +'px; " title="'+card_data[i]+'"></div>';
            comp.append(child);        
		}
		var index = 0;
		comp.children().each(function () {		    
		    $(this).data('card',card_data[index]);
		    $(this).data('up',false);
		    index++;
		});
		if (this.clickable) {
            comp.children().click(function () {
                var up = !$(this).data('up');
                $(this).removeClass();
                $(this).addClass(up?'card_up':'card');
                $(this).data('up',up);
		    });
		}
    },
    out_card: function () {        
        var card_up = [];
        $('#'+this.render_to+' .card_up').each(function () {
            card_up.push($(this).data('card'));
        });
        $('#'+this.render_to+' .card_up').remove();
        var index = 0;
        $('#'+this.render_to+' .card').each(function () {
            $(this).css('left',index*20);
            index++;
        });        
        return card_up;
    }
}
	
var app_ui = {
	init: function(){
		$(window).resize(app_ui.do_layout);
		app_ui.do_layout();
		//create div
		card_data = [];
		for(i=0;i<17;i++) {
			card_data.push(get_random_card());
		}
		var p1_hand_card = new CardControl({render_to:'p1_hand_card',clickable:true});
		p1_hand_card.set_card_data(card_data);
		
		var p1_out_card = new CardControl({render_to:'p1_out_card'});
		p1_out_card.set_card_data([1,2,3,4,35]);
		
        $('.play_button button').click(function () {
            if ($(this).attr('id') == 'card_out') {
                var x = p1_hand_card.out_card();
                p1_out_card.set_card_data(x);
            }
            return false;
        })		
	},	
	do_layout: function(){
		var wx = $(window).height();
		var wy = $(window).width();
		var game_view_height = wx - top_bar_height - 20;
		$('#game_view').height(game_view_height);
		$('#side_view').height(game_view_height);
		var cx = wx*0.8/2;
		var cy = wy*0.8/2;
		//console.log('do_layout, windows.height='+$(window).height()+',view_height='+game_view_height);
	}
};

$(function() {
    app_ui.init();    
});
