window.app = {
	clubPlaying: false,
	ryuFocus: false
};

$(document).ready(function () {
	$(document).on('mouseenter', '.ryu', doAction);
	$(document).on('mouseleave', '.ryu', doAction);
	$(document).on('mousedown', '.ryu', doAction);
	$(document).on('mouseup', '.ryu', doAction);
	$(document).on('keydown', doAction);
	$(document).on('keyup', doAction);
});

function doAction(event) {
	var ryuStill = $('.ryu-still'),
		ryuReady = $('.ryu-ready'),
		ryuThrowing = $('.ryu-throwing'),
		ryuCool = $('.ryu-cool');

	switch (event.type) {
	case 'mouseenter':
		app.ryuFocus = true;
		if (app.clubPlaying) return true;
		showHide(ryuReady);
		break;
	case 'mouseleave':
		app.ryuFocus = false;
		if (app.clubPlaying) return false;
		showHide(ryuStill);
		break;
	case 'mousedown':
		showHide(ryuThrowing);
		playHadouken();
		break;
	case 'mouseup':
		if (app.clubPlaying) showHide(ryuCool);
		else showHide(ryuReady);
		break;
	case 'keydown':
		if (event.keyCode == 88 && !app.clubPlaying) {
			showHide(ryuCool);
			clubJams(true);
		}
		break;
	case 'keyup':
		if (event.keyCode == 88) {
			if (app.ryuFocus) showHide(ryuReady);
			else showHide(ryuStill);
			clubJams(false);
		}
		break;
	}
}

function showHide(toShow) {
	$('.ryu-img').hide();
	toShow.show();
}

function playHadouken() {
	var hadouken = $('#hadouken-sound')[0];

	$('.hadouken')
		.finish()
		.show()
		.animate({
				'margin-left': '500px'
			},
			800,
			function () {
				$(this).hide();
				$(this).css('margin-left', '-10px');
			}
	);

	hadouken.volume = 0.3;
	hadouken.load();
	hadouken.play();
}

function clubJams(play) {
	var club = $('#club')[0];
	app.clubPlaying = play;

	if (play) {
		club.volume = 0.3;
		club.load();
		club.play();
	}
	else {
		club.pause();
	}
}