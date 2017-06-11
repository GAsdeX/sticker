$(document).ready(function() {
// НЕ ДЛЯ ДИНАМИЧЕСКИ СОЗДАННОГО DIV
	$( ".stickerDiv" ).resizable({
	maxHeight: 400,
	maxWidth: 550,
	minHeight: 125,
	minWidth: 160,
	containment: "#appConteiner"
	});
	$( ".stickerDiv" ).draggable({ containment: "#appConteiner", scroll: false });
// СОЗДАНИЕ СТИКЕРА
	$('#btnCreate').on('click', function () {
			$('#appConteiner').append('<div class="stickerDiv" id="draggable"><textarea name="stiker" rows="10" cols="80" placeholder="Название заметки" class="stikerHeader"></textarea><textarea name="stikerText" rows="10" cols="80" placeholder="Текст заметки" wrap="soft" class="stikerText"></textarea></div>')
// ИЗМЕНЕНИЕ РАЗМЕРА ЭЛЕМЕНТА
			$( ".stickerDiv" ).resizable({
			maxHeight: 400,
			maxWidth: 550,
			minHeight: 125,
			minWidth: 160,
			containment: "#appConteiner"
			});
// ПЕРЕМЕЩЕНИЕ СТИКЕРА
			$( ".stickerDiv" ).draggable({ containment: "#appConteiner", scroll: false });
// ВЫДЕЛЕНИЕ МЫШКОЙ
			$('.stickerDiv').on('dblclick', function () {
				$(this).css({'border': '2px solid #000', 'box-sizing': 'content-box'});
		});
// ШРИФТ ЗАГОЛОВОКА СТИКЕРА
//УВЕЛИЧЕНИЕ
				$( "#stikerHeader-fontSizePlus" ).on( "click", function() {
				$( ".stikerHeader" ).css( "font-size", "+=2" );
				});
// УМЕНЬШЕНИЕ
				$( "#stikerHeader-fontSizeMinus" ).on( "click", function() {
				$( ".stikerHeader" ).css( "font-size", "-=2" );
				});
// ШРИФТ ТЕКСТА СТИКЕРА
//УВЕЛИЧЕНИЕ
				$( "#skickerText-fontSizePlus" ).on( "click", function() {
				$( ".stikerText" ).css( "font-size", "+=2" );
				});
// УМЕНЬШЕНИЕ
				$( "#skickerText-fontSizeMinus" ).on( "click", function() {
				$( ".stikerText" ).css( "font-size", "-=2" );
				});
				var allElements = {
					elem0: {
						// width: document.getElementById('draggable').offsetWidth,
						// height: document.getElementById('draggable').offsetHeight,
						position: $('.stickerDiv').css('position'),
						width: $('#draggable').outerWidth(),
						height: $('#draggable').outerHeight(),
						border: $('#draggable').css('border'),
						background: $('#draggable').css('background'),
						borderRadius: $('#draggable').css('border-radius'),
						boxSizing: $('#draggable').css('box-sizing'),
						color: $('#draggable').css('color'),
						padding: $('#draggable').css('padding'),
						overflow: $('#draggable').css('overflow')
					}
				}
				// console.log(allElements.elem0.width);
			});
});
