jQuery(function($) {
    var pick_file      = $('.pick-file');
    var file           = $('#file');
    var image          = $('.box-image');
    var recognize_file = $('.recognize');
    var result         = $('.recognized-text');
    var load_modal     = $('.modal');
    var file_url       = "";

    pick_file.on('click', function() {
        file.trigger('click');
    });

    recognize_file.on('click', function() {

        if(!file_url) {
            alert("Nenhuma imagem selecionada!");
            return false;
        }

        load_modal.modal('show');
        load_modal.find('.progress').text("Carregando... 0%");

        Tesseract.recognize(file_url)
        .progress(function(data){
            var progress = data.progress * 100;

            load_modal.find('.progress').text("Carregando..." + progress.toFixed(2) + "%");
        })
        .then(function(data){
            result.val(data.text);
            load_modal.modal('hide');
        })
        .catch(function(err){
            alert("Erro: " + err);
            load_modal.modal('hide');
        });
    });

    file.on('change', function(event) {
        file_url = URL.createObjectURL(event.target.files[0]);

        image.find('img').remove();
        image.append('<img class="image" src="' + file_url + '" alt="Imagem a ser Escaneada">');
    });
});