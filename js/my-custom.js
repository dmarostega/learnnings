"use strict"

var div = $('<div></div>');
var span = $('<span></span>')
var p = $('<p></p>');
var file = $('<input type="file"  />')

class FileManager{
    constructor(){
        this.items = [];
    }

    files(file){
        if(typeof(file) == 'object' && file != undefined ){
            this.items.push(file);
        }

        return this.items;
    }
}

$.fn.upload = function (options) {
    var options = $.extend({}, options);
    var dropzone = $(this);
    var name = $(this).attr('id')
    dropzone.addClass('dropzone');

    var form = $(this).parents('form');

    var formData = new FormData();


    console.log(form);

   // alert("\nFormulário ", form.tagName);

    var input_file = file.clone().attr('name','input_from_'+name+'[]');
        input_file.attr('id','dz-input-file');
        input_file.attr('multiple',true);

    var fileManage = new FileManager();

    /**
     * Create title componente
     */
    dropzone.append(
        div.clone().addClass('row').append(div.clone().addClass('col-12').append(p.clone().addClass('title').append(name)))
            .append(div.clone().attr('id','dz-content').addClass('col-12').append(input_file))
    );

    input_file.change(function(e){
        var target_files = e.target.files;
        for(var i = 0; i < target_files.length; i++){
            fileManage.files(target_files[i]);
            
            formData.append('file_'+i,target_files[i]);

            $('#dz-content').append(div.clone().addClass('dz-item card col-4')
                                        .append('<p style="width: 80%;display: inline-block">'+target_files[i].name+'</p>')
                                        .append(div.clone().addClass('dz-item-remove').css('cursor','pointer').css('display',' inline-block').css('width','5%').append('<i style="width: 5%; display:"inline-block;float:left;" class="fa fa-close">X</i>')   )
                                    );
        }
    });

   /* $('.dz-item-remove i').on('click',function(e){
        var zone_remove = $(this).parents('.dz-item');
            zone_remove.css('background-color','red');
    });
*/

    form.on('submit', function(e){
        e.preventDefault();
      //  e.target.append(formData);

        for(var file of fileManage.files()){

           console.log('\nNovo Fle   ',file);
           
        }
        e.target.append(formData);
        e.target.submit();
        console.log('\nFileManager have ' , fileManage.files() );
        console.log('enviei!!');
        return;
    })


    
}
