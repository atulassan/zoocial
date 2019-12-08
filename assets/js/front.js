var socket = io.connect('http://zoocial.ch:4005/');
//var socket = io.connect('http://35.181.30.23:4004');

var user_id = session_id;
socket.emit('getPetCount', {
    user_id: user_id
});
socket.on('triggerPetCount', function(res) {
    socket.emit('getPetCount', {
        user_id: user_id
    });
});

socket.on('displayPetCount', function(response) {
    if (response.status == "success") {
        var pets = response.pets;
        if (pets > 1) {
            var count = '<span>' + response.pets + '</span> Tiere';
        } else {
            var count = '<span>' + response.pets + '</span> Tier';
        }

        var postcount = '<span>' + response.posts + '</span> Post';

        $('.user_petcount').html(count);
        $('.user_postcount').html(postcount);

        $('.notification_count').html(response.notify);

        $('span.top-count.message_count').html(response.messages);

        var element = document.getElementById("sidebarCollapse");

        if (response.messages > 0) {
            $('.chat_list[data-receiver-id="' + response.sender.sender + '"]').addClass('newmessage');
            if (element) {
                element.classList.add("newmessage");
            }
        } else {
            $('.chat_list').removeClass('newmessage');
            if (element) {
                element.classList.remove("newmessage");
            }
        }


        if (response.views) {
            response.views.forEach(function(element) {
                if (element.service_id) {
                    var servicecount = '<img src="home/images/svg/eye.svg"> <span>' + element.count + '</span>';
                    $('.view_count[data-view-id="' + element.service_id + '"]').html(servicecount);
                }

            });
        } else {
            $('.view_count span').html(0);
        }

        if (response.views_job) {
            response.views_job.forEach(function(job) {
                if (job.job_id) {
                    var jobcount = '<img src="home/images/svg/eye.svg"> <span>' + job.count + '</span>';
                    $('.view_count_job[data-view-id="' + job.job_id + '"]').html(jobcount);
                }

            });
        } else {
            $('.view_count_job span').html(0);
        }


        if (response.carts) {
            $('span.top-count.product_count').html(response.carts);
        } else {
            $('span.top-count.product_count').html(0);
        }


        if (response.likes) {
            response.likes.forEach(function(element1) {
                if (element1.service_id) {
                    var scount = '<img src="home/images/svg/like-green.svg"> <span>' + element1.count + '</span>';
                    $('.likes_count[data-like-id="' + element1.service_id + '"]').html(scount);
                }

            });
        } else {
            $('.likes_count span').html(0);
        }

        $('span.top-count.req_count').html(response.reqcount.req_count);

    }
});

/* $(document).ready(function () {
    $('.alert').hide();
    $('.errorMsg').hide();
 
    //$('#petsInfoForm')[0].reset();
    
    //setRefresh();
    
     setInterval(function(){    
        $.ajax({
            type:'POST',
            url: 'home/ajax-actions',
            data: {process:42},
            dataType: 'JSON',
            success: function(res){                             
                if(res.result.status=="success"){               
                    var pets = res.result.pets;                  
                    if(pets>1){
                        var count = '<span>'+res.result.pets+'</span> Tiere';
                    }else{
                        var count = '<span>'+res.result.pets+'</span> Tier';
                    }
                    
                    var postcount = '<span>'+res.result.posts+'</span> Post';
                    
                    $('.user_petcount').html(count);                
                    $('.user_postcount').html(postcount);
                    
                    $('.notification_count').html(res.result.notify);
                    
                    $('.message_count').html(res.result.messages);
                    
                    var element = document.getElementById("sidebarCollapse");   
                    
                    if(res.result.messages){
                       $('.chat_list[data-receiver-id="'+res.result.sender.sender+'"]').addClass('newmessage');                     
                       if(element){
                         element.classList.add("newmessage");
                       }                    
                    }else{                      
                       $('.chat_list').removeClass('newmessage');
                       if(element){
                        element.classList.remove("newmessage");
                        }                      
                    }               
                    
                    
                    if(res.result.views)
                    {                   
                        res.result.views.forEach(function(element){
                            if(element.service_id){
                                 $('.view_count[data-view-id="'+element.service_id+'"] span').html(element.count);
                            }                           
                            
                        });
                    }else{
                                 $('.view_count span').html(0);
                    }
                    
                    
                    if(res.result.views_job)
                    {                   
                        res.result.views_job.forEach(function(job){
                            if(job.job_id){                             
                                 $('.view_count_job[data-view-id="'+job.job_id+'"] span ').html(job.count);
                            }                           
                            
                        });
                    }else{
                                 $('.view_count_job span').html(0);
                    }
                    
                    
                    
                    if(res.result.likes)
                    {                   
                        res.result.likes.forEach(function(element1){
                            if(element1.service_id){
                                 $('.likes_count[data-like-id="'+element1.service_id+'"] span').html(element1.count);
                            }                           
                            
                        });
                    }else{
                                 $('.likes_count span').html(0);
                    }
                    
                    $('span.top-count.req_count').html(res.result.reqcount.req_count);
                                   
                }  
            }
        });
        return false;
    },500); 
     
});
 */

function checkNotEmpty(val) {
    if (val != '' && val != 0 && typeof(val) != 'undefined' && typeof(val) != 'null')
        return true;
    else return false;
}

function showDiv(element) {
    document.getElementById('OptionZüchter').style.display = element.value == 'züchter' ? 'block' : 'none';
    document.getElementById('OptionTierarzt').style.display = element.value == 'tierarzt' ? 'block' : 'none';
}

/* var url = (window.location.origin);
if(url=='http://192.168.1.79:4004'){
    var socket = io.connect('http://192.168.1.79:4004');
}
else{
    var socket = io.connect('http://35.181.30.23:4004');
}  */

$(document).on('click', '#formSubmit', function() {
    $('.cnt_msg').hide();
    var name = $('#name').val();
    var email = $('#email').val();
    var phone = $('#phone').val();
    var msg = $('#message').val();
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;

    if ($('#checkbox2').prop("checked") == true) {
        var promo = 1;
    } else {
        var promo = 2;
    }

    if (name != '' && email != '' && phone != '' && msg != '') {
        if (re.test(email)) {
            $('.emailError').html('');
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                data: $('form#contactForm').serialize() + '&promo=' + promo + '&process=1',
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == 'success') {
                        $('.cnt_msg').show();
                        $('form#contactForm')[0].reset();
                    } else {
                        return false;
                    }
                }
            });
            return false;
        } else {
            $('.emailError').html('Invalid Email ID');
        }
    }
});

$(document).on('keypress', '#name,#message', function(e) {
    if ((e.which > 96 && e.which < 123) || (e.which > 64 && e.which < 90) || e.which == 32 || e.which == 46 || e.which == 8 || e.which == 0)
        return true;
    else {
        return false;
    }
});


$(document).on('keypress', '#phone,#phone1,#phone2,#age,#edit_age', function(e) {
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        return false;
    }
});


/* $(document).on('focusout','#email',function(){
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if(re.test(email)){
            
        }else{
            alert('Invalid E-Mail ID');
        }
        $('#email').focus();
}); */


$(document).on('keyup', '#email,#password', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == 13) {
        $('.user_register').trigger('click');
    }
});


$(document).on('click', '.user_register', function() {
    var uname = $('#username').val();
    var email = $('#email').val();
    var pwd = $('#password').val();
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;

    $('.errorMsg').hide();

    /* if(uname==''){
        $('#username').closest('.form-group').find('.errorMsg').show();
    }else  */

    if (email == '') {
        $('#email').closest('.form-group').find('.errorMsg').show();
    } else if (pwd == '') {
        $('#password').closest('.form-group').find('.errorMsg').show();
    } else {
        if (re.test(email)) {
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                //data: $('form#register_form').serialize()+'&process=2',
                data: {
                    process: 2,
                    mail: email,
                    pass: pwd,
                    user: uname
                },
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == "success") {
                        //alertify.alert('Registrierung completed. Bestätigungslink an Ihre E-Mail gesendet. Bitte aktivieren Sie es.',function(){
                        //location.href="login"; 
                        //});
                        $('.reg_mail').html(email);
                        $('.registration-success').addClass('active');
                        $('.popUp-backdrop').addClass('show');

                    }
                    if (res.result.status == "exist") {
                        alertify.alert(res.result.message);
                    }
                }
            });
            return false;
        } else {
            alertify.alert('Ungültige E-Mail-ID');
        }

    }
});

$(document).on('keyup', '#pass,#uname', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == 13) {
        $('.user_login').trigger('click');
    }
});
$(document).on('click', '.user_login', function() {
    var user = $('#uname').val();
    var pass = $('#pass').val();

    $('.errorMsg').hide();

    if (user == '') {
        $('#uname').closest('.form-group').find('.errorMsg').show();
    } else if (pass == '') {
        $('#pass').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            url: 'home/ajax-actions',
            type: 'POST',
            data: {
                process: 3,
                user: user,
                pass: pass
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    location.href = 'timeline';
                } else {
                    alertify.alert('E-Mail-Adresse oder Passwort ist falsch');
                }
            }
        });
        return false;
    }
});

$(document).on('click', '.forgot_pass', function() {
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    var email = $('#email').val();

    if (re.test(email)) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 6,
                email: email
            },
            dataType: 'JSON',
            success: function(res) {

                if (res.result.status == "success") {
                    alertify.alert(res.result.message, function() {
                        location.href = '/login';
                    });

                } else {
                    alertify.alert(res.result.message);
                }
            }
        });

    } else {
        alertify.alert('Geben Sie die gültige E-Mail-ID ein');
    }
});


/// FB Registration & Login //

$(document).on('click', '.fb_signup', function() {
    fbSignin();
});

$(document).on('click', '.fb_login', function() {
    fbLogin();
});

window.fbAsyncInit = function() {
    FB.init({
        appId: '508142996279605', //App ID
        cookie: true,
        xfbml: true,
        version: 'v2.11'
    });
    FB.AppEvents.logPageView();

};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

var fbSignin = function() {

    FB.login(
        function(response) {
            if (response.status === "connected") {
                var uID = response.authResponse.userID;

                FB.api('/me', {
                    fields: 'name, email'
                }, function(response) {
                    registerFB(response);
                }); //closes fb.api
            } else if (response.status === "not_authorized") {
                //authCancelled. redirect
            }
        }, {
            scope: 'user_location,user_likes,email'
        }
    );
};

function registerFB(response) {
    var name = response.name;
    var email = response.email;

    $.ajax({
        type: "POST",
        url: 'home/ajax-actions',
        data: {
            loginType: 2,
            name: name,
            email: email,
            process: 4
        },
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function(res) {

            if (res.result.status == "success") {
                alertify.alert('Registrierung completed. Bestätigungslink an Ihre E-Mail gesendet. Bitte aktivieren Sie es.', function() {
                    location.href = "login";
                });

            }
            if (res.result.status == "exist") {
                alertify.alert(res.result.message);
            }
        },

    });
}

var fbLogin = function() {
    FB.login(
        function(response) {
            if (response.status === "connected") {
                var uID = response.authResponse.userID;

                FB.api('/me', {
                    fields: 'name, email'
                }, function(response) {
                    loginFB(response);
                });
            } else if (response.status === "not_authorized") {
                //authCancelled. redirect
            }
        }, {
            scope: 'user_location,user_likes,email'
        }
    );
};

function loginFB(response) {
    var name = response.name;
    var email = response.email;

    $.ajax({
        type: "POST",
        url: 'home/ajax-actions',
        data: {
            email: email,
            process: 5
        },
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function(res) {
            if (res.result != null) {
                location.href = 'profile';
            } else {
                alertify.alert('Invalid Login');
            }
        },

    });
}
///--FB login reg ends--//



$(document).on('click', '.log_out', function() {
    //alertify.confirm('Are you want to log out?',function(res){

    $.ajax({
        type: "POST",
        url: 'home/ajax-actions',
        data: {
            process: 95
        },
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function(res) {
            if (res.result != null) {
                location.href = '/4bees';
            } else {
                alertify.alert('can not logout');
            }
        },

    });


    //});   
});

$(document).on('click', '.update_basicinfo', function() {

    /*  var info = $('#basicInfoForm').serialize();
        var formss = $('form#basicInfoForm'); */

    var form_data = new FormData($('form#basicInfoForm')[0]);
    form_data.append('process', 7);

    var dob = $('#dob').val();
    var year = $('#year').val();
    var gender = $('#gender').val();
    var age = $('#age').val();
    var inter = $('#interest').val();

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.result.status == "success") {
                alertify.alert('Basisinformationen werden aktualisiert', function() {
                    location.href = 'profile';
                });

            }
        }
    });
});


$(document).on('click', '.update_contactinfo', function() {

    var form_data = new FormData($('form#contactinfoForm')[0]);
    form_data.append('process', 8);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                alertify.alert('Kontaktinformationen aktualisiert', function() {
                    location.href = 'profile';
                });

            }
        }
    });
});


$(document).on('click', '.address_info', function() {

    var form_data = new FormData($('form#addressInfoForm')[0]);
    form_data.append('process', 9);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                alertify.alert('Adressinfo aktualisiert', function() {
                    location.href = 'profile';
                });
            }
        }
    });
});


$(document).on('click', '#dob', function() {

    /*  $('#dob').datepicker({
        autoclose: true,
        todayHighlight: true,
        dateFormat: 'yy-mm-dd',
        maxDate:0
    }); */

    $(this).datepicker().datepicker("show");
    //$(this).datepicker().datepicker(format:"dd.mm.yyyy"); 

    //$("#dob").val('');
});


$(document).on('change', '#dob', function() {

    var dob = new Date($("#dob").val());
    var dob_year = (dob.getFullYear());
    var dob_month = (dob.getMonth() + 1);
    var dob_date = (dob.getDate());

    var date = dob_date + '.' + dob_month + '.' + dob_year;
    //alert(date);
    $("#dob").html(date);

    var today = new Date();
    var diff_date = today - dob;

    var years = Math.floor(diff_date / 31536000000);

    if (years > 1) {
        $('#age').val(years);
    } else {
        $('#age').val();
        $('#age').html();
    }
});

$(document).on('click', '#edit_dob', function() {

    $('#edit_dob').datepicker({
        autoclose: true,
        todayHighlight: true,
        autoclose: true,
        dateFormat: 'yy-mm-dd',
        maxDate: 0
    });

    $(this).datepicker().datepicker("show");
});

$(document).on('change', '#edit_dob', function() {

    var edit_dob = new Date($("#edit_dob").val());
    var today = new Date();
    var diff_date = today - edit_dob;

    var years = Math.floor(diff_date / 31536000000);

    if (years > 1) {
        $('#edit_age').val(years);
    } else {
        $('#edit_age').val('');
        $('#edit_age').html('');
    }
});


$(document).on('click', '.pets_info', function() {
    var file = $('#petGallery').prop("files");
    var art = $('#art_id').attr('data-art');
    var rasse = $('#rasse_id').attr('data-rasse');

    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#petsInfoForm')[0]);
    form_data.append('petGallery', file);
    form_data.append('petart', art);
    form_data.append('petrasse', rasse);
    form_data.append('process', 10);

    var petname = $('#pet_name').val();

    /* if(petname==''){
        $('#pet_name').closest('.form-group').find('.errorMsg').show();
    }else{} */
    if (checkNotEmpty(petname)) {
        $.ajax({
            url: 'home/ajax-actions',
            method: 'POST',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,

            success: function(res) {

                if (res.result.status == "success") {
                    alertify.alert('Haustiere Informationen wurden erfolgreich hinzugefügt', function() {
                        location.href = "pets";
                    });

                }
            }
        });
        return false;
    } else {
        alertify.alert('Der Name des Haustieres ist obligatorisch');
    }
});


$(document).on('click', '.profile_pets_info', function() {
    var file = $('#petGallery').prop("files");
    var art = $('#art_id').attr('data-art');
    var rasse = $('#rasse_id').attr('data-rasse');

    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#petsInfoForm')[0]);
    form_data.append('petGallery', file);
    form_data.append('petart', art);
    form_data.append('petrasse', rasse);
    form_data.append('process', 10);

    var petname = $('#pet_name').val();

    /* if(petname==''){
        $('#pet_name').closest('.form-group').find('.errorMsg').show();
    }else{} */
    if (checkNotEmpty(petname)) {
        $.ajax({
            url: 'home/ajax-actions',
            method: 'POST',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,

            success: function(res) {

                if (res.result.status == "success") {
                    alertify.alert('Haustiere Informationen wurden erfolgreich hinzugefügt', function() {
                        $("#add-pet-info").modal()
                    });

                }
            }
        });
        return false;
    } else {
        alertify.alert('Der Name des Haustieres ist obligatorisch');
    }
});


/* var inputLocalFont = document.getElementById("petGallery");
inputLocalFont.addEventListener("change",previewImages,false); */


$(document).on('change', '#petGallery', function() {
    var fileList = this.files;
    var anyWindow = window.URL || window.webkitURL;

    for (var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        var preview = '<li class="multi_img"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="175" height="198"></li>';
        $('.add_gallery').append(preview);
        window.URL.revokeObjectURL(fileList[i]);
        //$('#petGallery').push(fileList[i]);
    }
});

//var inputLocal= document.getElementById("edit_petGallery");
$(document).on('change', '#edit_petGallery', function() {
    var fileList = this.files;

    var anyWindow = window.URL || window.webkitURL;

    for (var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);
        var preview = '<li class="multi_img"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="175" height="198"></li>';
        $('.edit_petglry').append(preview);
        window.URL.revokeObjectURL(fileList[i]);
    }
});
//inputLocal.addEventListener("change",editpreviewImages,false);

function editpreviewImages() {



}

$(document).on('click', '.remove_prvimg', function() {
    $(this).closest("li").remove();
    $('#postImageUpload').val('');
});

$(document).on('click', '.remove_prvimg_video', function() {
    $(this).closest("li").remove();
    $('#postVideoUpload').val('');
});

$(document).on('click', '.remove_prvgrp_video', function() {
    $(this).closest("li").remove();
    $('#postVideoGroup').val('');
});


$(document).on('change', '#userImageUpload', function() { //Change User Profile Pic

    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#img_upload')[0]);
    form_data.append('file', file);
    form_data.append('process', 11);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.result.status == "success") {
                $('.user_image').attr('src', '/images/users/' + res.result.fileName);
            }
            if (res.result.status == "invalid") {
                alertify.alert(res.result.message);
            }
        }
    });
    return false;
});

$(document).on('change', '#petImageUpload', function() { //Change pet Profile Pic

    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#img_upload')[0]);
    form_data.append('file', file);
    form_data.append('process', 23);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.result.status == "success") {
                $('.pet_image').attr('src', '/images/pets/' + res.result.fileName);
                //$('.pet_image').attr('src','/images/pets/'+res.result.fileName);
            }
            if (res.result.status == "invalid") {
                alertify.alert(res.result.message);
            }
        }
    });
    return false;
});

/* $(document).on('change','#coverImageUpload',function(){  //Change Cover Pic
    $('.loader-logo').show();
    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;
     
    var form_data = new FormData($('form#img_upload')[0]);                  
    form_data.append('file', file);
    form_data.append('process', 12); 
 
    $.ajax({
        url:'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data:form_data, 
        success: function(res){
            if (res.result.status=="success"){
                
                $('.cover_img').attr('style','background:url(./images/users/'+res.result.fileName+') no-repeat; background-size:cover');  
                
            }
            if(res.result.status=="invalid"){
                $('.loader-logo').hide();
                alertify.alert(res.result.message);
            }
        }
    });
    return false;
}); */


$(document).on('change', '#inputImage', function() {
    //alert('test');

    $('.docs-buttons').show();
    var file = $(this).prop("files")[0];



    var form_data = new FormData($('form#img_upload')[0]);
    form_data.append('file', file);
    form_data.append('process', 50);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {

            if (res.result.status == "success") {
                $('#cover-image').attr('src', 'images/users/' + res.result.fileName);
                $('#cover-img-update').show();
                applyCropper('cover-image');
            }
            if (res.result.status == "invalid") {
                alertify.alert(res.result.message);
            }
        }
    });
    return false;

});

$(document).on('click', '.crop_save', function() {
    var img = $('.crop_save').attr('data-cropped');
    //console.log(img);

    setTimeout(function() {
        var img = $('.crop_save').attr('data-cropped');

        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 51,
                img: img
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == "success") {
                    location.reload();
                }
            }
        });
    }, 1000);

});


$(document).on('change', '#pet_profilepic', function() { //Change Pet Profile Pic

    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#petsInfoForm')[0]);
    form_data.append('file', file);
    form_data.append('process', 13);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.status == "success") {
                //alertify.alert(res.message);
                $('#prof_img').val(imagename);

                var anyWindow = window.URL || window.webkitURL;
                var objectUrl = anyWindow.createObjectURL(file);
                var preview = '<img src="' + objectUrl + '" alt="" width="100" height="100">';
                $('.upload_petpic').html(preview);

            }
            if (res.status == "invalid") {
                alertify.alert(res.message);
            }
        }
    });
    return false;
});



/* $(document).on('change','#petGallery',function(){  //Pet gallery 
 
    var file = $(this).prop("files");
    
    var form_data = new FormData($('form#petsInfoForm')[0]);
    form_data.append('petGallery',file);
    form_data.append('process', 18); 
     
    $.ajax({
        url:'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data:form_data, 
        success: function(res){ 
          if (res.result.status=="success"){
                display_petImages();
            }
        }
    });
    
    return false;  
 

}); */

$(document).on('click', '.set_pic', function() {

    var pic = $(this).attr('data-img');
    var petid = $(this).attr('data-petid');

    alertify.confirm('Möchten Sie dies als Ihr Haustierprofilbild festlegen?', function(res) {

        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 32,
                pic: pic,
                petid: petid
            },
            dataType: 'JSON',
            success: function(res) {

            }
        });
        location.href = '/pets';
    });
});

$(document).on('click', '.edit_petinfo', function() {
    var id = $(this).attr('data-pet-id');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 15,
            id: id
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('#edit_name').val(res.result.info.pet_name);
                $('#edit_geburtsjahr').val(res.result.info.geburtsjahr);
                $('#edit_chip').val(res.result.info.chipnum);
                $('#edit_dob').val(res.result.info.dob);
                $('#edit_age').val(res.result.info.age);
                $('#edit_gender').val(res.result.info.gender);
                $('#edit_breed').val(res.result.info.breed);
                $('#edit_color').val(res.result.info.color);
                $('#edit_fur').val(res.result.info.fur);
                $('#edit_food').val(res.result.info.food);
                $('#edit_aboutpet').val(res.result.info.about_pet);
                $('#update_img').val(res.result.info.pet_profilepic);
                $('#pet_id').val(id);

                $('#select-art').val(res.result.info.artname);
                $('#editart_id').val(res.result.info.art);
                $('#select-rasse').val(res.result.info.rasname);
                $('#editrasse_id').val(res.result.info.rasse);

                var petpic = res.result.info.pet_profilepic
                var pet_prof = '';

                if (checkNotEmpty(petpic)) {
                    pet_prof = 'images/pets/' + petpic;
                } else {
                    var pet_prof = 'images/pets/dummy_pet.jpg';
                }

                $('.petimage').attr('src', pet_prof);

                var preview = '<img src="' + pet_prof + '" alt="" width="50" height="50">';
                $('.pet_profpic').html(preview);

                var pets_gal = (res.result.gallery);
                var pets_images = '';

                $('.edt_img').remove();
                $.each(pets_gal, function(index, value) {

                    pets_images = '<li class="edt_img"><div class="action-btn delete_petimg" data-galleryid="' + value.id + '"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img class="set_pic pic' + value.id + '" data-img="' + value.image + '"  data-petid="' + id + '" data-petgalleryid="' + value.id + '" src="images/pets/' + value.image + '" alt="" width="175" height="198"></li>';

                    $('.edit_petglry').append(pets_images);
                });
                //alert($.isArray(pets_gal));
                var array = res.result.info.herrchenl.split(",");
                $('#edit_hob').prop("checked", false);
                $('#edit_occ').prop("checked", false);
                $('#edit_herr').prop("checked", false);

                $.each(array, function(i) {
                    if (array[i] == 1) $('#edit_hob').prop("checked", true);
                    if (array[i] == 2) $('#edit_occ').prop("checked", true);
                    if (array[i] == 3) $('#edit_herr').prop("checked", true);
                });

                var looking = res.result.info.looking.split(",");
                $('#edit_look1').prop("checked", false);
                $('#edit_look2').prop("checked", false);
                $('#edit_look3').prop("checked", false);
                $('#edit_look4').prop("checked", false);

                $.each(looking, function(i) {
                    if (looking[i] == 1) $('#edit_look1').prop("checked", true);
                    if (looking[i] == 2) $('#edit_look2').prop("checked", true);
                    if (looking[i] == 3) $('#edit_look3').prop("checked", true);
                    if (looking[i] == 4) $('#edit_look4').prop("checked", true);
                });

                var liking = res.result.info.like_most.split(",");
                $('#edit_walks').prop("checked", false);
                $('#edit_kshare').prop("checked", false);
                $('#edit_sports').prop("checked", false);

                $.each(liking, function(i) {
                    if (liking[i] == 1) $('#edit_walks').prop("checked", true);
                    if (liking[i] == 2) $('#edit_kshare').prop("checked", true);
                    if (liking[i] == 3) $('#edit_sports').prop("checked", true);
                });

                var breed = res.result.info.breeding_papers;
                $('#edit_paper1').prop("checked", false);
                $('#edit_paper2').prop("checked", false);

                if (breed == 1) $('#edit_paper1').prop("checked", true);
                if (breed == 2) $('#edit_paper2').prop("checked", true);


                var geschlecht = res.result.info.geschlecht;
                $('#edit_geschlecht1').prop("checked", false);
                $('#edit_geschlecht1').prop("checked", false);

                if (geschlecht == 1) $('#edit_geschlecht1').prop("checked", true);
                if (geschlecht == 2) $('#edit_geschlecht2').prop("checked", true);

                var art = res.result.art;
                /* if(checkNotEmpty(art)){
                    $('.art'+art).attr('selected');
                } */
            }
        }
    });
    return false;
});


$(document).on('change', '#update_petpic', function() { //Update Pet Profile Pic

    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(file);
    var preview = '<img src="' + objectUrl + '" alt="" width="100" height="100">';
    $('.pet_profpic').html(preview);
    window.URL.revokeObjectURL(file);


    var form_data = new FormData($('form#petsUpdateForm')[0]);
    form_data.append('file', file);
    form_data.append('process', 14);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.status == "success") {

                $('#update_img').val(res.imgname);
            }
            if (res.status == "invalid") {
                alertify.alert(res.message);
            }
        }
    });
    return false;
});

$(document).on('click', '.update_petinfo', function() {
    //  setTimeout(function(){
    var file = $('#edit_petGallery').prop("files");
    var imagename = file.name;
    var imagetype = file.type;
    var updtImg = $('#update_img').val();
    var petid = $('#pet_id').val();

    var form_data = new FormData($('form#petsUpdateForm')[0]);
    form_data.append('edit_image', updtImg);
    form_data.append('pet_id', petid);

    form_data.append('process', 16);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: form_data,
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.result.status == "success") {
                alertify.alert('Haustiere Informationen wurden erfolgreich aktualisiert', function() {
                    location.href = '/pets';
                });

            }
        }
    });
    return false;


    //  },2000);

});

$(document).on('click', '.remove_pet', function() {
    var id = $(this).attr('data-pet-id');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 17,
            id: id
        },
        dataType: 'JSON',
        success: function(res) {
            if (res) {
                alertify.alert('Pet Info Deleted', function() {
                    location.href = '/pets';
                });

            }
        }
    });
    return false;

});

$(document).on('click', '.delete_petimg', function() {
    var id = $(this).attr('data-galleryid');

    $(this).closest("li").remove();

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 18,
            id: id
        },
        dataType: 'JSON',
        success: function(res) {
            if (res) {
                //alertify.alert('Image Deleted');

            }
        }
    });
    return false;

});

$(document).on('click', '.view_reply', function() {
    var post_id = $(this).attr('data-postid');
    $('.reply_' + post_id).show();
    $('.view_reply').hide();
    $('.view_comments_' + post_id).hide();
});

/* $(document).on('change','#postImageUpload',function(){  //Upload the pic for wall posts
    
    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;
     
    var form_data = new FormData($('form#img_upload')[0]);                  
    form_data.append('file', file);
    form_data.append('process', 19); 
 
    $.ajax({
        url:'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data:form_data, 
        success: function(res){
            if (res.result.status=="success"){
                $('.post_image').attr('src','/images/pets/'+res.result.imagess);
                $('.img_preview').show();
                $('#imgName').val(res.result.imagess);
                $('#postType').val(1);
            }
            if(res.result.status=="invalid"){
                alertify.alert(res.result.message);
            }
        }
    });
    return false;
}); */

$(document).on('change', '#postImageUploadOthers', function() {
    $('.publishpost_others').show();
    var fileList = this.files;

    var anyWindow = window.URL || window.webkitURL;

    for (var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);

        var preview = '<li class="multi_img"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="175" height="198"></li>';

        $('.img_preview').show();
        $('.post_imgpreview').append(preview);

        window.URL.revokeObjectURL(fileList[i]);
    }
});

$(document).on('change', '#postVideoUploadOthers', function() {
    $('.publishpost_others').show();
    var fileList = event.target.files[0];
    var fileReader = new FileReader();

    fileReader.onload = function() {
        var blob = new Blob([fileReader.result], {
            type: fileList.type
        });
        var url = URL.createObjectURL(blob);
        var video = document.createElement('video');
        var timeupdate = function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
            }
        };
        video.addEventListener('loadeddata', function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
            }
        });
        var snapImage = function() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
                var img = document.createElement('img');

                var thumb = '<li class="multi_img"><div class="action-btn remove_prvideo_others"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + image + '" alt="" width="75" height="75"></li>';

                $('.post_vidpreview').append(thumb);
                $('.vid_preview').attr('style', 'display:block;');
                URL.revokeObjectURL(url);

            }
            return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.play();
    };

    fileReader.readAsArrayBuffer(fileList);


});


$(document).on('click', '.remove_prvideo_others', function() {
    $(this).closest("li").remove();
    $('#postVideoUploadOthers').val('');
});


$(document).on('click', '.publishpost_others', function() {

    var file = $('#postImageUploadOthers').prop("files");
    var video = $('#postVideoUploadOthers').prop("files");
    var about = $('#about_others').val();
    var otheruser = $(this).attr('data-userid');

    var form_data = new FormData($('form#petpostForm')[0]);
    form_data.append('postImageUpload', file);
    form_data.append('postVideoUpload', video);
    form_data.append('otheruser', otheruser);
    form_data.append('process', 61);

    $('.uploadProgressbar').hide();

    if (checkNotEmpty(about) || (file.length != 0) || (video.length != 0)) {
        $('.uploadProgressbar').show();
        $.ajax({
            url: 'home/ajax-actions',
            method: 'POST',
            dataType: 'JSON',
            data: form_data,
            cache: false,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.result.status == "success") {
                    $('.uploadProgressbar').hide();
                    location.reload();
                }
            }
        });
        return false;
    } else {

        alertify.alert('Schreiben Sie über Ihr Haustier, um es zu veröffentlichen');
    }
});


$(document).on('keyup', '#about_others', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var abt = $('#about_others').val();
    var imagee = $('#postImageUploadOthers').val();
    var video = $('#postVideoUploadOthers').val();

    if (checkNotEmpty(abt) || checkNotEmpty(imagee) || checkNotEmpty(video)) {
        $('.publishpost_others').show();
    } else {
        $('.publishpost_others').hide();
    }

    if (keycode == 8 || keycode == 46) {
        if (checkNotEmpty(abt)) {
            $('.publishpost_others').show();
        } else {
            $('.publishpost_others').hide();
        }
    }
});


$(document).on('change', '#postImageUpload, #postPetImages', function() {
    $('.publish_post').show();
    var fileList = this.files;

    var anyWindow = window.URL || window.webkitURL;

    for (var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);

        var preview = '<li class="multi_img"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="175" height="198"></li>';

        $('.img_preview').show();
        $('.post_imgpreview').append(preview);

        window.URL.revokeObjectURL(fileList[i]);

        /*var str = objectUrl.substring('blob:http://localhost:4004/'.length);
         

        $.ajax({
            url:'home/ajax-actions',    
            method: 'POST',
            data:{process:30,imagess:objectUrl}, 
            dataType:'JSON',
            success : function(res){ 
            if (res.result.status=='success') {
                     
                } else {
                    return false;
                } 
            }
        }); */

    }

});

$(document).on('change', '#postVideoUpload', function() {

    $('.publish_post').show();

    var fileList = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var blob = new Blob([fileReader.result], {
            type: fileList.type
        });
        var url = URL.createObjectURL(blob);
        var video = document.createElement('video');

        var timeupdate = function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
            }
        };

        video.addEventListener('loadeddata', function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
            }
        });

        var snapImage = function() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
                var img = document.createElement('img');

                var thumb = '<li class="multi_img"><div class="action-btn remove_prvimg_video"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + image + '" alt="" width="75" height="75"></li>';
                $('.post_vidpreview').append(thumb);
                $('.vid_preview').attr('style', 'display:block;');
                URL.revokeObjectURL(url);
            }
            return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.play();
    };

    fileReader.readAsArrayBuffer(fileList);



});

$(document).on('keypress', '#about,#about_others', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') {
        //$( ".publish_post" ).trigger( "click" );
        return false;
    }

});

$(document).on('keyup', '#about', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var abt = $('#about').val();
    var imagee = $('#postImageUpload').val();
    var video = $('#postVideoUpload').val();

    if (checkNotEmpty(abt) || checkNotEmpty(imagee) || checkNotEmpty(video)) {

        if (checkNotEmpty(abt)) {
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                data: {
                    process: 111,
                    url: abt
                },
                success: function(res) {
                    if (res.result.status == "success") {
                        if (checkNotEmpty(res.result.data.image.url)) {
                            $('.ogimage').html('<div><image src=' + res.result.data.image.url + ' alt="image" /><h4 id="mtitle">' + res.result.data.title + '</h4><p id="mdescription">' + res.result.data.description + '</p></div>');
                            $('.ogimage_block').addClass('none');
                        } else {
                            $('.ogimage_block').removeClass('none');
                            return false;
                        }
                    }
                    return false;
                }
            });
        }
        $('.publish_post').show();
    } else {
        $('.ogimage_block').removeClass('none');
        $('.publish_post').hide();
        $('.ogimage').html('');
    }

    if (keycode == 8 || keycode == 46) {
        if (checkNotEmpty(abt)) {
            $('.publish_post').show();
        } else {
            $('.publish_post').hide();
        }
    }
});

$(document).on('click', '.publish_post', function() {

    var file = $('#postImageUpload').prop("files");
    var imgfile = $('#postPetImages').prop("files");

    var video = $('#postVideoUpload').prop("files");

    var about = $('#about').val();


    var form_data = new FormData($('form#petpostForm')[0]);
    form_data.append('postImageUpload', file);
    //form_data.append('postImageUpload',imgfile);
    form_data.append('petImageUpload', imgfile);

    form_data.append('postVideoUpload', video);
    form_data.append('process', 20);

    //console.log(form_data);
    $('.uploadProgressbar').hide();

    if (checkNotEmpty(about) || (file.length != 0) || (video.length != 0)) {

        $('.uploadProgressbar').show();

        var someimage = document.getElementById('ogimage');
        var myimg = someimage.getElementsByTagName('img')[0];
        console.log(myimg);
        if (myimg != undefined) {
            console.log('test1');
            var mysrc = myimg.src;
            var imgname = mysrc.split("/").slice(-1)[0];
            var description = document.getElementById("mdescription").innerHTML;
            var title = document.getElementById("mtitle").innerHTML;
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    about: about,
                    description: description,
                    title: title,
                    url: mysrc,
                    imgname: imgname,
                    process: 112
                },
                cache: false,
                success: function(res) {
                    console.log(res);
                    if (res.result.status == "success") {
                        $('.uploadProgressbar').hide();
                        window.location.reload();
                    }
                }
            });
        } else {
            console.log('test2');
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(res) {
                    console.log(res);
                    if (res.result.status == "success") {
                        $('.uploadProgressbar').hide();
                        window.location.reload();
                    }
                }
            });
        }
        return false;
    } else {
        alertify.alert('Schreiben Sie über Ihr Haustier, um es zu veröffentlichen');
    }
});

$(document).on('click', '.clsPostPopUp', function() {
    $('form#petpostForm')[0].reset();
});

$(document).on('keypress', '#postinfo,#pet_posttxt', function() {
    return false;
});

$(document).on('click', '#pet_posttxt', function() {
    $('.ogimage').html('');
    $('.ogimage_block').removeClass('none');
    $('.publish_post').hide();
    $('#about').focus();
    $('#about_others').focus();
    $('form#petpostForm')[0].reset();

});

$(document).on('click', '.petpost_close , #postinfo', function() {
    $('form#petpostForm')[0].reset();
    $('.remove_prvimg').trigger('click');
    $('.img_preview').hide();
});

$(document).on('click', '.comments_display , .comments_display_wall, .comments_display_group', function() {

    var btn = '<a class="btn btn-primary btn-gradient-light btn-publish post_comments" data-postid="" data-posted-user=""  data-commented-user="" href="javascript:;" >POST</a>';

    $('.post_reply').html(btn);

    $('.submit_comment').val('');
});

$(document).on('keypress', '.comments_display, .comments_display_wall, .comments_display_group', function() {
    return false;
});

$(document).on('click', '.submit_comment_chat', function(event) {
    var post_id = $(this).attr('data-postid');
    var comments = $('.post' + post_id + ' #enter_comment').val();
    var imagee = $('#commentImage').val();
    var groupCmnt = $('.post' + post_id + ' #enter_comment').attr('data-groupCmnt');
    var groupID = $('.post' + post_id + ' #enter_comment').attr('data-groupid');
    var process = 21;

    if (checkNotEmpty(comments) || checkNotEmpty(imagee)) {
        var post_id = $('.post' + post_id + ' #enter_comment').attr('data-postid');
        var posted_by = $('.post' + post_id + ' #enter_comment').attr('data-createdby');
        var commented_by = $('.post' + post_id + ' #enter_comment').attr('data-commented-user');

        $.ajax({
            url: 'home/ajax-actions',
            method: 'POST',
            dataType: 'JSON',
            data: {
                post_id: post_id,
                posted_by: posted_by,
                commented_by: commented_by,
                comments: comments,
                imagee: imagee,
                groupID: groupID,
                process: process
            },
            cache: false,
            success: function(res) {
                //   console.log(res);
                if (res.result.status == "success") {
                    var profilepic = res.result.user.profile_pic;
                    var petpic = res.result.user.pet_profile_pic;
                    var username = res.result.user.username;
                    var userid = res.result.user.id;
                    var comment_info = res.result.comment;
                    var comment_id = comment_info.id;

                    var cmt = '';
                    cmt = '<div class="form-row cmnt_' + comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + ((profilepic) ? (profilepic) : ('dummy_user.jpg')) + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + ((petpic) ? (petpic) : ('dummy_pet.jpg')) + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + username + '</span>' + comments;

                    if (imagee) { //available image comment displayed  
                        cmt += '<p><a data-fancybox="" href="images/comment_images/' + imagee + '"><img src="images/comment_images/' + imagee + '" height="80"></a></p>';

                    }

                    cmt += '</div><div class="comment-settings"><div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + comment_id + '" href="javascript:;" data-cmt="' + comment_id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + comment_id + ' " href="javascript:;" data-cmt="' + comment_id + '"  data-postid="' + post_id + '">Delete Kommentieren</a> </div></div></div></div> <div class="col-lg-12 my-auto p-0">  ';

                    cmt += '</div></div>';

                    $('.recent_comment' + post_id).append(cmt);
                    $('.post' + post_id + ' .submit_comment').val('');
                    $('#commentImage').val('');
                    $('.upload-images-list').hide();
                    //location.reload();
                }
            }
        });

        return false;
    }
});
$(document).on('keyup', '.submit_comment', function(event) {

    var keycode = (event.keyCode ? event.keyCode : event.which);
    var comments = $(this).val();
    var imagee = $('#commentImage').val();
    var groupCmnt = $(this).attr('data-groupCmnt');
    var groupID = $(this).attr('data-groupid');
    var process = 21;

    if (keycode == '13') {
        if (checkNotEmpty(comments) || checkNotEmpty(imagee)) {

            var post_id = $(this).attr('data-postid');
            var posted_by = $(this).attr('data-createdby');
            var commented_by = $(this).attr('data-commented-user');

            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    post_id: post_id,
                    posted_by: posted_by,
                    commented_by: commented_by,
                    comments: comments,
                    imagee: imagee,
                    groupID: groupID,
                    process: process
                },
                cache: false,
                success: function(res) {
                    //   console.log(res);
                    if (res.result.status == "success") {
                        var profilepic = res.result.user.profile_pic;
                        var petpic = res.result.user.pet_profile_pic;
                        var username = res.result.user.username;
                        var userid = res.result.user.id;
                        var comment_info = res.result.comment;
                        var comment_id = comment_info.id;

                        var cmt = '';
                        cmt = '<div class="form-row cmnt_' + comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + ((profilepic) ? (profilepic) : ('dummy_user.jpg')) + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + ((petpic) ? (petpic) : ('dummy_pet.jpg')) + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + username + '</span>' + comments;

                        if (imagee) { //available image comment displayed  
                            cmt += '<p><a data-fancybox="" href="images/comment_images/' + imagee + '"><img src="images/comment_images/' + imagee + '" height="80"></a></p>';

                        }

                        cmt += '</div><div class="comment-settings"><div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + comment_id + '" href="javascript:;" data-cmt="' + comment_id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + comment_id + ' " href="javascript:;" data-cmt="' + comment_id + '"  data-postid="' + post_id + '">Delete Kommentieren</a> </div></div></div></div> <div class="col-lg-12 my-auto p-0">  ';

                        cmt += '</div></div>';

                        $('.recent_comment' + post_id).append(cmt);
                        $('.submit_comment').val('');
                        $('#commentImage').val('');
                        $('.upload-images-list').hide();
                        //location.reload();
                    }
                }
            });

            return false;
        }
    }
});


$(document).on('keyup', '.comment, #enter_comment', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == 13) {
        $(".post_comments").trigger("click");
    }
});

//Chat list //
$(document).ready(function() {
    var chatWidth = $('.chat-contact-box').width();

    $('.chat-box').css({
        "marginRight": chatWidth
    });

    $(".chat-contact-box-inner").mCustomScrollbar({
        theme: "light"
    });
    $(".chat-box-inner").mCustomScrollbar({
        theme: "light"
    });

    $('#dismiss').on('click', function() {
        $('.chat-contact-box').removeClass('active');
        $('.chat-box').removeClass('active');
        $('.chat-box').remove();
        displayChatBox();
        //  $('.chat-box').css({"marginRight":"0"}); 
    });

    $('.max').on('click', function() {

        if ($('.chat-contact-box').hasClass('active')) {
            $('.chat-box').attr('style', "margin-right: 300px; width:400px;");
        } else {
            $('.chat-box').attr('style', "margin-right: 0px; width:400px;");
        }

        $('.chat-box-inner').css({
            "height": "80vh",
            "overflow-y": " auto",
            "padding": " 10px 8px 80px 8px;",
            "border-left": "1px solid #fac934;"
        });

    });

    $('.min').on('click', function() {

        if ($('.chat-contact-box').hasClass('active')) {
            $('.chat-box').attr('style', "margin-right: 300px; height:50px; width:300px;");
        } else {
            $('.chat-box').attr('style', "margin-right: 0px; height:50px; width:300px;");
        }
    });

    $('#sidebarCollapse').on('click', function() {
        $('.chat-contact-box').toggleClass('active');
        $('.chat-box').removeClass('active');
        $('.chat-box').remove();
        displayChatBox();
        //$('.chat-box').css({"marginRight":chatWidth});
        //$('.chat').addClass('active');
    });
    /*  $('.chat-contact-box .right-my-circle li').on('click', function () {
         $('.chat-box').addClass('active');
     }); */

    $(document).on('click', '.chat-contact-box .right-my-circle li', function() {
        if (!$('.chat-box').hasClass('active')) {
            $('.chat-box').addClass('active');
            $('.chat-box').attr('style', "margin-right: 300px;");
        }

    });



});

//---//

function scrollToBottom(id) {
    $("#messages").stop().animate({
        scrollTop: $("#messages ul li:last")[0].scrollHeight
    }, 0);
    //$('#messages').animate({scrollTop: $('#messages ul li:last').offset().top}); 
}




$(document).on('click', '#dismiss1', function() {
    var rec = $(this).attr('data-rec');
    $('.chatbox' + rec).removeClass('active');
    $('.chatbox' + rec).remove();
    arr.splice($.inArray(rec, arr), 1);
    displayChatBox();

    //$('.chat').removeClass('active');
});


$(document).on('click', '.rec_message', function() {
    var sender = $(this).attr('data-send');
    var receiver = $(this).attr('data-rec');

    if ($('.chat-contact-box').hasClass('active')) {
        $('.chat-box').attr('style', 'margin-right: 300px');
        $('.chat-box').addClass('active');
    } else {
        $('.chat-box').attr('style', 'margin-right: 0');
        $('.chat-box').addClass('active');
    }

    chatList(sender, receiver);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 60,
            rec_id: sender,
            sen_id: receiver
        },
        dataType: 'JSON',
        success: function(res) {
            $('.message_count').html(res.result.messages);
        }
    });
    return false;
});


function chatList(sender, rec) {
    var chtbx = $('.chat-box').hasClass('active');
    var url = window.location.origin;
    socket.emit('previous_chats', {
        sender: sender,
        receiver: rec
    });
    $('.display_screen' + sender).html('');
    $('.display_screen' + rec).html('');
    var cht_name = '';
    var cht_pic = '';
    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        data: {
            receiver: rec,
            sender: sender,
            process: 22
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == 'success') {
                cht_name = res.result.info.username;
                cht_pic = res.result.info.profile_pic;
                cht_petpic = res.result.info.pet_profile_pic;
                sender_petpic = res.result.senderinfo.senderpet;
                var chtbox = '<div class="chat-box sender' + sender + ' receiver' + rec + ' box-shadow chatbox' + rec + ' active" style="margin-right: 300px;"> <div class="contact-search inner-gradient-bg"><div class="profile-group chat_history chathistory' + rec + '">  <div class="profile-img one border-rounded chat_profile" data-id="' + rec + '"> <img class="rounded-circle" src="images/users/' + ((cht_pic) ? (cht_pic) : ('dummy_user.jpg')) + '" alt="Profile image"> </div>  <div class="profile-img two border-rounded chat_profile" data-id="' + rec + '"> <img class="rounded-circle" src="images/pets/' + ((cht_petpic) ? (cht_petpic) : ('dummy_pet.jpg')) + '" alt="Profile image"> </div> <h4 class="mt-0 chat_profile" data-id="' + rec + '">' + cht_name + '</h4></div><ul class="chat-controls"> <li class="min" id="min' + rec + '" data-rec="' + rec + '" style="display:none;"><img src="home/images/svg/multi-tab.svg"></li> <li class="max" id="max' + rec + '" data-rec="' + rec + '"  style="display:none;"><img src="home/images/svg/maximize.svg"></li> <li id="dismiss1" data-rec="' + rec + '" ><img src="home/images/svg/close.svg"></li> </ul></div> <div class="inputbox-position"><div class="chat-box-inner innerChatbox' + rec + '"><div class="messages" id="messages"> <ul id="messages_list" class="display_screen' + rec + '  message_list"> </ul> </div> </div> <div class="message-input"> <div class="input-group"> <div class="chatUploadAttch' + rec + ' chat-post-attachment" style="display:none;" > <ul> <li><img src="home/images/svg/chat-attachment.svg" alt="" width="50" height="50"></li> <li> <span class="attach-file-name' + rec + '"> </span> </li> </ul> <a class="det-chat-attach" href="javascript:;" title="Delete" data-rec="' + rec + '" >&times;</a> </div> <input type="text" id="attachment' + rec + '" class="form-control"   value="" style="display:none;"> <textarea cols="40" id="write_msg' + rec + '" data-rec="' + rec + '" class="form-control write_msg" placeholder="Nachricht schreiben" value=""></textarea> <input type="hidden" id="sender' + rec + '" value=""> <input type="hidden" id="receiver' + rec + '" value=""> <input type="hidden" id="sender_pet' + rec + '" value=""> <input type="hidden" id="receiver_pet' + rec + '" value=""> <input type="hidden" id="oldname' + rec + '" name="oldname"  value=""  > <div class="input-group-append"> <div class="loader' + rec + ' chatDocUploadloader" style="display:none;"> <img src="home/images/ajax-loader.gif" width="36px"> </div> <button class="btn btn-default send_msg" id="send_msg' + rec + '" data-rec="' + rec + '" type="button"><i class="fa fa-paper-plane"></i></button> </div> </div> <div class="chat-icon"> <ul> <li> <form id="chatForm' + rec + '" name="chatForm" enctype="multipart/form-data" accept="image/jpeg"> <input type="hidden" id="chatUpload' + rec + '" name="chatUpload" accept="image/jpeg, image/png" value=""> <a href="javascript:void(0);" class="update-icon chatAttch" data-recid="' + rec + '"><img src="home/images/chat-post-icon.jpg"></a> <input style="display:none;" name="chatAttachment" class="fileUpload chtAtach" data-rec="' + rec + '" id="chatAttachment' + rec + '" value="" type="file" accept="image/jpeg, image/png"> </form> </li> <li class="chat-logo"><img src="home/images/chat-fooer-logo.png"></li> </ul> </div> </div> </div> </div>';

                $('.classA').append(chtbox);
                $('#write_msg' + rec).val('');
                $('#sender' + rec).val(sender);
                $('#receiver' + rec).val(rec);
                $('#sender_pet' + rec).val(sender_petpic);
                $('#receiver_pet' + rec).val(cht_petpic);
                //$(".newchatmessage").removeClass("newmessage");
                $('.chat-box-inner').mCustomScrollbar("scrollTo", 'bottom', {
                    scrollInertia: 0
                });
            }
        }
    });
    return false;
}

$(document).on('click', '.chatAttch', function() {
    var cht = $(this).attr('data-recid');
    $('#chatAttachment' + cht).trigger('click');
});

var arr = [];

$(document).on('click', '.chat_list', function() {

    var rec = $(this).attr('data-receiver-id');
    var sender = $(this).attr('data-sender-id');
    var rec_img = $(this).attr('data-receiver-pet');
    var sender_img = $(this).attr('data-sender-pet');

    var userID = rec;

    if ($.inArray(userID, arr) != -1) {
        arr.splice($.inArray(userID, arr), 1);
    }

    arr.unshift(userID);

    var chatbox = $('.chat-box').hasClass('chatbox' + rec + '');
    if (chatbox == false) {
        chatList(sender, rec);
    }


    $('#chatUpload' + rec).val('');
    $('#attachment' + rec).val('');
    $('#attachment' + rec).attr('style', 'display:none;');
    displayChatBox();
    $('.chat-box-inner').css({
        "height": "60vh",
        "overflow-y": " auto",
        "padding": " 10px 8px 80px 8px;",
        "border-left": "1px solid #fac934;"
    });

    setTimeout(function() {
        $('#receiver' + rec).val(rec);
        $('#sender' + rec).val(sender);
        $('#receiver_pet' + rec).val(rec_img);
        $('#sender_pet' + rec).val(sender_img);
    }, 1000);
});

function displayChatBox() {
    i = 300; // start position
    j = 310; //next position

    $.each(arr, function(index, value) {
        if (index < 3) {
            $('.chatbox' + value).css("margin-right", i);
            $('.chatbox' + value).show();
            i = i + j;
        } else {
            $('.chatbox' + value).hide();
        }
    });
}


function timeStampString(aDate) {
    var timeString = '';
    var dateString = '';

    var day = aDate.getDate();
    var month = aDate.getMonth() + 1; //january is 0
    var year = aDate.getFullYear();
    var recDate = day + '-' + month + '-' + year;

    var today = new Date();
    var t_day = today.getDate();
    var t_month = today.getMonth() + 1; //january is 0
    var t_year = today.getFullYear();
    var curDate = t_day + '-' + t_month + '-' + t_year;
    var yesDate = (t_day - 1) + '-' + t_month + '-' + t_year;

    var h = aDate.getHours();
    var m = aDate.getMinutes();
    var s = aDate.getSeconds();
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;


    if (aDate != 'Invalid Date') {
        var dateString = day + '.' + month + '.' + year;
        var timeString = h + ':' + m + ':' + s;
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;
    }
    if (recDate == curDate) dateString = 'Heute';
    else if (recDate == yesDate) dateString = 'Gestern';
    else dateString = dateString;

    var timing = new Array(dateString, timeString);
    return timing;
}

socket.on('display_chathistory', (data) => {
    setTimeout(function() {
        var content = data.result;
        var receiver = data.receiver;
        //console.log(content);
        var dString = tString = recid = senid = '';
        $.each(content, function(index, val) {
            var aDate = new Date(Date.parse(val.received_date));
            aDate.setHours(aDate.getHours() - 5);
            aDate.setMinutes(aDate.getMinutes() - 30);


            var rdate = timeStampString(aDate);

            var dateString = rdate[0];
            var timeString1 = rdate[1];

            var n = timeString1.includes("AM");
            if (n == true) {
                var time = timeString1.replace("AM", " AM");
            } else {
                var time = timeString1.replace("PM", " PM");
            }

            var hrs = Number(time.match(/^(\d+)/)[1]);
            var mnts = Number(time.match(/:(\d+)/)[1]);
            var format = time.match(/\s(.*)$/)[1];
            if (format == "PM" && hrs < 12) hrs = hrs + 12;
            if (format == "AM" && hrs == 12) hrs = hrs - 12;
            var hours = hrs.toString();
            var minutes = mnts.toString();
            if (hrs < 10) hours = "0" + hours;
            if (mnts < 10) minutes = "0" + minutes;


            var timeString = hours + ":" + minutes;

            if (dateString != '') {
                if (tString != dateString) {
                    //console.log(tString+' - '+dateString);
                    dString = '<li class="sent"><div class="chat-date">' + dateString + '</div></li>';
                    tString = dateString;
                } else dString = '';
            }
            senid = val.sender;
            recid = val.receiver;
            $('.display_screen' + val.receiver).append(dString + '<li class="sent"><div class="chat-image right"><img src="images/pets/' + ((val.pet_profile_pic) ? (val.pet_profile_pic) : ('dummy_pet.jpg')) + '"><span class="chat-time">' + timeString + '</span></div><p>' + val.message + (checkNotEmpty(val.attachment) ? ('<a class="file_dwnld" href="/uploaded_files/chat/' + val.attachment + '" target="_blank"><span class="inside-chat-attach"><img src="home/images/svg/chat-attachment.svg"></span><span class="inside-attach-file-name">' + val.oldname + '</span></a>') : '') + '</p></li>');

            $('.display_screen' + val.sender).append(dString + '<li class="replies"><div class="chat-image left"><img src="images/pets/' + ((val.pet_profile_pic) ? (val.pet_profile_pic) : ('dummy_pet.jpg')) + '"><span class="chat-time">' + timeString + '</span></div><p>' + val.message + (checkNotEmpty(val.attachment) ? ('<a class="file_dwnld" href="/uploaded_files/chat/' + val.attachment + '" target="_blank"> <span class="inside-chat-attach"><img src="home/images/svg/chat-attachment.svg"></span><span class="inside-attach-file-name">' + val.oldname + '</span></a>') : '') + '</p></li>');
        });
        var a = '.display_screen' + receiver;
        var b = 'li';
        $('.innerChatbox' + receiver).animate({
            scrollTop: $(a + ' ' + b).last().offset().top
        }, 0);

    }, 500);

});

/*$(document).on('keyup', '.write_msg', function() {
    var recid = ($(this).attr('data-rec'));
    //console.log(recid)
    var msg = $('#write_msg' + recid).val();
    //console.log('#write_msg'+recid)
    $('#write_msg' + recid).val(msg);
});*/


$(document).on('click', '.send_msg', function() {
    var recid = $(this).attr('data-rec');
    $('.chatUploadAttch' + recid).attr('style', 'display:none;');
    var aDate = new Date();
    var timeString = '';
    var dateString = '';

    var day = aDate.getDate();
    var month = aDate.getMonth() + 1; //january is 1
    var year = aDate.getFullYear();
    var h = aDate.getHours();
    var m = aDate.getMinutes();
    var s = aDate.getSeconds();


    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    if (h < 10) h = '0' + h;
    if (m < 10) m = '0' + m;
    if (s < 10) s = '0' + s;

    var date = year + '-' + month + '-' + day + ' ' + h + ':' + m + ':' + s;




    if (aDate != 'Invalid Date') {
        var dateString = day + '.' + month + '.' + year;
        var timeString = h + ':' + m + ':' + s;
        var H = +timeString.substr(0, 2);
        var h = (H % 12) || 12;
        var ampm = H < 12 ? "AM" : "PM";
        timeString = h + timeString.substr(2, 3) + ampm;

    }

    var message = $('#write_msg' + recid).val();
    var sender = $('#sender' + recid).val();
    var receiver = $('#receiver' + recid).val();
    var sender_petimg = $('#sender_pet' + recid).val();
    var receiver_petimg = $('#receiver_pet' + recid).val();
    var attachment = $('#chatUpload' + recid).val();
    var oldname = $('#oldname' + recid).val();

    $('#write_msg' + recid).val("");
    $('#chatUpload' + recid).val("");


    if (checkNotEmpty(message) || checkNotEmpty(attachment)) {
        var writemsg = (message.replace(/\"/g, ""));
        socket.emit('msg_display', {
            cid: recid,
            write_msg: writemsg,
            sender: sender,
            receiver: receiver,
            sender_petimg: sender_petimg,
            receiver_petimg: receiver_petimg,
            date: dateString,
            time: timeString,
            attachment: attachment,
            oldname: oldname
        });
        socket.emit('insert_chat', {
            sender: sender,
            receiver: receiver,
            msg: writemsg,
            date: date,
            attachment: attachment,
            oldname: oldname
        });
    }
});


$(document).on('keyup', '.write_msg', function(event) {
    var recid = $(this).attr('data-rec');
    var text_msg = $('#write_msg' + recid).val();
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13' && checkNotEmpty(text_msg) && !event.shiftKey) {
        $('#send_msg' + recid).trigger("click");

        /* setTimeout(function(){
            $('.chat-box-inner').mCustomScrollbar("scrollTo",'bottom',{scrollEasing:'easeOut'});
        },150); */
        return false;
    }

    //$('.display_screen17 li:last-child').focus();
});

socket.on('compose_msg1', (data) => {

    setTimeout(function() {
        $('.chat-box-inner').mCustomScrollbar("scrollTo", 'bottom', {
            scrollEasing: 'easeOut'
        });
    }, 1500);

    var a = '.sender' + data.sender;
    var b = '.display_screen' + data.receiver;
    var c = '.receiver' + data.receiver;
    var d = '.display_screen' + data.sender;
    var g = '.sender' + data.receiver;

    var n = data.received_time.includes("AM");
    if (n == true) {
        var time = data.received_time.replace("AM", " AM");
    } else {
        var time = data.received_time.replace("PM", " PM");
    }

    var hrs = Number(time.match(/^(\d+)/)[1]);
    var mnts = Number(time.match(/:(\d+)/)[1]);
    var format = time.match(/\s(.*)$/)[1];
    if (format == "PM" && hrs < 12) hrs = hrs + 12;
    if (format == "AM" && hrs == 12) hrs = hrs - 12;
    var hours = hrs.toString();
    var minutes = mnts.toString();
    if (hrs < 10) hours = "0" + hours;
    if (mnts < 10) minutes = "0" + minutes;

    var timeString = hours + ":" + minutes;



    $(a + ' ' + b).append('<li class="sent"><div class="chat-date"></div></li><li class="sent"><div class="chat-image right"><img src="images/pets/' + ((data.sender_pet) ? (data.sender_pet) : ('dummy_pet.jpg')) + '"><span class="chat-time">' + timeString + '</span></div><p>' + data.write_msg + (checkNotEmpty(data.attachment) ? ('<a class="file_dwnld" href="/uploaded_files/chat/' + data.attachment + '" target="_blank"> <span class="inside-chat-attach"><img src="home/images/svg/chat-attachment.svg"></span><span class="inside-attach-file-name">' + data.oldname + '</span></a>') : '') + '</p> </li>');

    $(g + ' ' + d).append('<li class="replies"><div class="chat-image left"><img src="images/pets/' + ((data.sender_pet) ? (data.sender_pet) : ('dummy_pet.jpg')) + '"><span class="chat-time">' + timeString + '</span></div><p>' + data.write_msg + (checkNotEmpty(data.attachment) ? ('<a  class="file_dwnld" href="/uploaded_files/chat/' + data.attachment + '" target="_blank"> <span class="inside-chat-attach"><img src="home/images/svg/chat-attachment.svg"></span><span class="inside-attach-file-name">' + data.oldname + '</span></a>') : '') + '</p></li>');

    //chatPopup(data.sender,data.receiver);   //chat pop up on receive msg
    //console.log(data);
    $('#write_msg' + data.receiver + ' .write_msg').val("");
    $('.chat-box-inner').scrollTop($('.chat-box-inner')[0].scrollHeight);


});

function chatPopup(sender, receiver) {
    $('.chatbox' + sender).addClass('active');
    $('.chatbox' + receiver).addClass('active');

    if ($('.chatContact' + receiver).hasClass('active')) {
        $('.chatbox' + receiver).attr('style', 'margin-right: 300px;');
    } else {
        $('.chatbox' + receiver).attr('style', 'margin-right: 0px;');
    }

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 57,
            sender: sender,
            receiver: receiver
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {

                var cht_pic = res.result.sender.pic;
                var cht_petpic = res.result.sender.pet_pic;
                var cht_name = res.result.sender.username;
                var rec_petpic = res.result.receiver.pet_profile_pic;

                var chat_list = '<div class="profile-img one border-rounded"> <img class="rounded-circle" src="images/users/' + ((cht_pic) ? (cht_pic) : ('dummy_user.jpg')) + '" alt="Profile image"> </div>  <div class="profile-img two border-rounded"> <img class="rounded-circle" src="images/pets/' + ((cht_petpic) ? (cht_petpic) : ('dummy_pet.jpg')) + '" alt="Profile image"> </div> <h4 class="mt-0">' + cht_name + '</h4> ';

                $('.chathistory' + receiver).html(chat_list);

                if ($('.chat-box').hasClass('chatbox' + receiver)) {
                    $('#sender').val(receiver);
                    $('#receiver').val(sender);
                    $('#sender_pet').val(rec_petpic);
                    $('#receiver_pet').val(cht_petpic);
                }
            }
        }
    });
    return false;

}



$(document).on('keyup', '#search_user', function(e) {

    var user_search = $('#search_user').val();

    var sender_id = $(this).attr('data-sender-id');
    var sender_pet = $(this).attr('data-sender-pet');
    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            keyword: user_search,
            process: 24
        },
        success: function(res) {
            //console.log(res);
            $('.userlist').html('');
            var result = res.result.list;
            if (checkNotEmpty(result)) {
                $.each(result, function(index, res) {
                    var list = '<li class="chat_list" data-receiver-id="' + res.id + '" data-sender-id="' + sender_id + '" data-sender-pet="' + sender_pet + '" data-receiver-pet="' + res.pet_profile_pic + '" ><div class="form-row p-0"><div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 my-auto p-0"><div class="profile-group"><div class="profile-img one border-rounded"><img class="rounded-circle" src="images/users/' + ((res.profile_pic) ? (res.profile_pic) : "dummy_user.jpg") + '" alt="Profile image"></div><div class="profile-img two border-rounded"><img class="rounded-circle" src="images/pets/' + ((res.pet_profile_pic) ? (res.pet_profile_pic) : "dummy_pet.jpg") + '" alt="Profile image"></div></div></div><div class="col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 my-auto p-0"><div class="media-body"><h4 class="mt-0">' + res.username + '</h4><p>' + ((res.status == 1) ? "Online" : "Offline") + '</p><div class="my-contact-status ' + ((res.status == 1) ? "online" : "offline") + '"></div></div></div><div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 my-auto p-0"><a class="newchatmessage" href="javascript:;"><span class="top-count message_count "> </span><img src="home/images/svg/chat.svg" alt=""></a>    </div></div></div></li>';

                    $('.userlist').append(list);
                });
            } else {
                $('.userlist').html('No user found');
            }
        }
    });
    return false;

});

$(document).on('click', '#dismiss', function() {
    //$('#search_user').val('');
});


$(document).on('click', '#ascending', function(e) {
    //var user_search = $('#search_user').val(); 

    var sender_id = $(this).attr('data-sender-id');
    var sender_pet = $(this).attr('data-sender-pet');
    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 43
        },
        success: function(res) {

            $('.userlist').html('');
            var result = res.result.list;
            if (checkNotEmpty(result)) {
                $.each(result, function(index, res) {
                    var list = '<li class="chat_list" data-receiver-id="' + res.id + '" data-sender-id="' + sender_id + '" data-sender-pet="' + sender_pet + '" data-receiver-pet="' + res.pet_profile_pic + '" ><div class="form-row p-0"><div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 my-auto p-0"><div class="profile-group"><div class="profile-img one border-rounded"><img class="rounded-circle" src="images/users/' + ((res.profile_pic) ? (res.profile_pic) : "dummy_user.jpg") + '" alt="Profile image"></div><div class="profile-img two border-rounded"><img class="rounded-circle" src="images/pets/' + ((res.pet_profile_pic) ? (res.pet_profile_pic) : "dummy_pet.jpg") + '" alt="Profile image"></div></div></div><div class="col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 my-auto p-0"><div class="media-body"><h4 class="mt-0">' + res.username + '</h4><p>' + ((res.status == 1) ? "Online" : "Offline") + '</p><div class="my-contact-status ' + ((res.status == 1) ? "online" : "offline") + '"></div></div></div><div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 my-auto p-0"><a class="newchatmessage" href="javascript:;"><span class="top-count message_count "> </span><img src="home/images/svg/chat.svg" alt=""></a>    </div></div></div></li>';

                    $('.userlist').append(list);
                });
            } else {
                $('.userlist').html('No user found');
            }
        }
    });
    return false;

});

$(document).on('click', '#descending', function(e) {

    //var user_search = $('#search_user').val(); 

    var sender_id = $(this).attr('data-sender-id');
    var sender_pet = $(this).attr('data-sender-pet');
    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 44
        },
        success: function(res) {

            $('.userlist').html('');
            var result = res.result.list;
            if (checkNotEmpty(result)) {
                $.each(result, function(index, res) {
                    var list = '<li class="chat_list" data-receiver-id="' + res.id + '" data-sender-id="' + sender_id + '" data-sender-pet="' + sender_pet + '" data-receiver-pet="' + res.pet_profile_pic + '" ><div class="form-row p-0"><div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 my-auto p-0"><div class="profile-group"><div class="profile-img one border-rounded"><img class="rounded-circle" src="images/users/' + ((res.profile_pic) ? (res.profile_pic) : "dummy_user.jpg") + '" alt="Profile image"></div><div class="profile-img two border-rounded"><img class="rounded-circle" src="images/pets/' + ((res.pet_profile_pic) ? (res.pet_profile_pic) : "dummy_pet.jpg") + '" alt="Profile image"></div></div></div><div class="col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 my-auto p-0"><div class="media-body"><h4 class="mt-0">' + res.username + '</h4><p>' + ((res.status == 1) ? "Online" : "Offline") + '</p><div class="my-contact-status ' + ((res.status == 1) ? "online" : "offline") + '"></div></div></div><div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 my-auto p-0"><a class="newchatmessage" href="javascript:;"><span class="top-count message_count "> </span><img src="home/images/svg/chat.svg" alt=""></a>    </div></div></div></li>';

                    $('.userlist').append(list);
                });
            } else {
                $('.userlist').html('No user found');
            }
        }
    });
    return false;

});


$(document).on('click', '#latest', function(e) {

    var sender_id = $(this).attr('data-sender-id');
    var sender_pet = $(this).attr('data-sender-pet');
    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 45
        },
        success: function(res) {
            $('.userlist').html('');
            var result = res.result.list;
            //console.log(result);
            if (checkNotEmpty(result)) {
                $.each(result, function(index, res) {
                    var list = '<li class="chat_list" data-receiver-id="' + res.id + '" data-sender-id="' + sender_id + '" data-sender-pet="' + sender_pet + '" data-receiver-pet="' + res.pet_profile_pic + '" ><div class="form-row p-0"><div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3 my-auto p-0"><div class="profile-group"><div class="profile-img one border-rounded"><img class="rounded-circle" src="images/users/' + ((res.profile_pic) ? (res.profile_pic) : "dummy_user.jpg") + '" alt="Profile image"></div><div class="profile-img two border-rounded"><img class="rounded-circle" src="images/pets/' + ((res.pet_profile_pic) ? (res.pet_profile_pic) : "dummy_pet.jpg") + '" alt="Profile image"></div></div></div><div class="col-xl-7 col-lg-7 col-md-7 col-sm-8 col-8 my-auto p-0"><div class="media-body"><h4 class="mt-0">' + res.username + '</h4><p>' + ((res.status == 1) ? "Online" : "Offline") + '</p><div class="my-contact-status ' + ((res.status == 1) ? "online" : "offline") + '"></div></div></div><div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1 my-auto p-0"><a class="newchatmessage" href="javascript:;"><span class="top-count message_count "> </span><img src="home/images/svg/chat.svg" alt=""></a>    </div></div></div></li>';

                    $('.userlist').append(list);
                });
            } else {
                $('.userlist').html('No user found');
            }
        }
    });
    return false;

});


$(document).on('click', '.change_userpass', function() {
    var oldpass = $('#old_pass').val();
    var newpass = $('#new_pass').val();
    var conpass = $('#conf_pass').val();


    var validate = true;

    if (!checkNotEmpty(oldpass)) {
        alertify.alert('Enter your old password');
        $('#old_pass').focus();
        validate = false;
        return false;
    }
    if (!checkNotEmpty(newpass)) {
        alertify.alert('Enter your new password');
        $('#new_pass').focus();
        validate = false;
        return false;
    }
    if (newpass.length < 6) {
        alertify.alert('New password should have atleast 6 characters');
        $('#new_pass').focus();
        validate = false;
        return false;
    }
    if (!checkNotEmpty(conpass)) {
        alertify.alert('Enter the confirm password');
        $('#conf_pass').focus();
        validate = false;
        return false;
    }
    if (conpass != newpass) {
        alertify.alert('Confirm password not matches  with New password');
        $('#conf_pass').focus();
        validate = false;
        return false;
    }
    if (validate) {
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 25,
                oldPassword: oldpass,
                newPassword: newpass,
                confirmPassword: conpass
            },

            success: function(res) {
                if (res.result.status == "success") {
                    alertify.alert(res.result.message, function() {
                        //location.href='/4bees';
                    });
                } else {
                    alertify.alert(res.result.message);
                    $('#old_pass').focus();
                    return false;
                }
            }
        });
        return false;
    }


});

$(document).on('change', '#tagging, #frnd_req, #allgemein, #kontakt, #wohnort', function() {

    if ($('#frnd_req').prop("checked") == true) {
        var frndreq = 1;
    } else {
        var frndreq = 2;
    }


    if ($('#tagging').prop("checked") == true) {
        var tag = 1;
    } else {
        var tag = 2;
    }

    if ($('#allgemein').prop("checked") == true) {
        var allg = 1;
    } else {
        var allg = 2;
    }

    if ($('#kontakt').prop("checked") == true) {
        var kont = 1;
    } else {
        var kont = 2;
    }

    if ($('#wohnort').prop("checked") == true) {
        var woh = 1;
    } else {
        var woh = 2;
    }

    $.ajax({
        method: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 26,
            frndreq: frndreq,
            tag: tag,
            allg: allg,
            kont: kont,
            woh: woh
        },
        success: function(res) {
            //alert('updated');
        }
    });


});


//User Image Crop begins//
$(function() {
    // properties
    var isCaptured = false;
    var thumbSize = 200;
    var imageCoords = {
        x: 0,
        y: 0
    };
    var imageScale = 1;
    var imageDimensions = {
        width: 0,
        height: 0,
        minScale: 0.01,
        maxScale: 1
    }
    var currentImage = null;
    var originalSettings = {
        coords: {
            x: 0,
            y: 0,
        },
        scale: 1,
        dimensions: {
            width: 0,
            height: 0,
            minimum: thumbSize
        }
    };
    var scaleCenter = {
        x: 0,
        y: 0
    };
    var grabCenter = false;
    var isShiftKeyDown = false;

    // dom dependencies
    var canvas = document.getElementById('imageCanvas');
    if (canvas != null)
        var ctx = canvas.getContext('2d');
    var canCon = $('.pop-post-new').find('.canvasCon');

    // methods
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function refreshImage() {
        clearCanvas();
        boxed();
        ctx.drawImage(currentImage,
            imageCoords.x, imageCoords.y,
            imageDimensions.width * imageScale, imageDimensions.height * imageScale);
    }

    function resetImage() {
        if (!currentImage) return;
        imageDimensions.width = originalSettings.dimensions.width;
        imageDimensions.height = originalSettings.dimensions.height;
        imageScale = originalSettings.scale;
        imageCoords.x = originalSettings.coords.x;
        imageCoords.y = originalSettings.coords.y;

        refreshImage();
    }

    function handleImage(e) {
        var reader = new FileReader();
        reader.onload = function(event) {
            currentImage = new Image();
            currentImage.onload = function() {
                imageCoords.x = 0;
                imageCoords.y = 0;
                originalSettings.dimensions.width = currentImage.width;
                imageDimensions.width = currentImage.width;
                originalSettings.dimensions.height = currentImage.height;
                imageDimensions.height = currentImage.height;
                var maxDim = Math.max(imageDimensions.height, imageDimensions.width);
                var minDim = originalSettings.dimensions.minimum = Math.min(imageDimensions.height, imageDimensions.width);
                /*  var op = (minDim < thumbSize) ? "show" : "hide";
                 $('.error')[op]();
                 if (minDim < thumbSize) {
                     canCon.hide();
                     $('#reset,#crop,.instructions,.cropResult').hide();
                     return;
                 } */
                imageScale = 1;
                originalSettings.dimensions.scale = 1;
                imageDimensions.maxScale = 1;
                if (maxDim > canvas.width) {
                    imageScale =
                        originalSettings.dimensions.scale = canvas.width / maxDim;
                }
                imageDimensions.minScale = thumbSize / minDim;
                boxed();
                // center image
                var above = thumbSize - imageCoords.y;
                var below = imageCoords.y + (imageDimensions.height * imageScale) - (thumbSize * 2);
                var overlap = (above + below) / 2;

                imageCoords.y += (above - overlap);

                above = thumbSize - imageCoords.x;
                below = imageCoords.x + (imageDimensions.width * imageScale) - (thumbSize * 2);
                overlap = (above + below) / 2;

                imageCoords.x += (above - overlap);

                canCon.show();
                $('#reset,#crop,.instructions').show();
                refreshImage();
            }
            currentImage.src = event.target.result;

        }


        reader.readAsDataURL(e.target.files[0]);
    }

    function startScaling(newPoint, scale) {
        scaleCenter.y = imageCoords.y + ((originalSettings.dimensions.height * scale) / 2);
        scaleCenter.x = imageCoords.x + ((originalSettings.dimensions.width * scale) / 2);
        grabCenter = false;
    }

    function scaleByCenter(coords, scale) {
        coords.y = scaleCenter.y - ((originalSettings.dimensions.height * scale) / 2);
        coords.x = scaleCenter.x - ((originalSettings.dimensions.width * scale) / 2);
    }
    // referee who makes sure the image is in the box
    function boxed() {
        imageCoords.x = Math.min(thumbSize, imageCoords.x);
        imageCoords.y = Math.min(thumbSize, imageCoords.y);

        imageCoords.x = Math.max(imageCoords.x, (thumbSize * 2) - (imageDimensions.width * imageScale));
        imageCoords.y = Math.max(imageCoords.y, (thumbSize * 2) - (imageDimensions.height * imageScale));
    }


    function imageCroppie(e) {

        $('.cr-boundary').hide();
        $('.cr-slider-wrap').hide();

        //$('.cropResult-base').hide();
        var fileList = this.files;
        var anyWindow = window.URL || window.webkitURL;
        var objectUrl = anyWindow.createObjectURL(fileList[0]);

        var $uploadCrop = $('#profileimageBox');
        $uploadCrop.croppie({
            enableExif: false,
            viewport: {
                width: 160,
                height: 160,
                type: 'circle'
            },
            boundary: {
                width: 250,
                height: 250
            }
        });

        $uploadCrop.croppie('bind', objectUrl);
        $('#crop').show();
    }
    // event handlers

    //$('#imageLoader').on('change', handleImage);



    $('#imageLoader').on('change', imageCroppie);


    $('#crop').click(function(e) {
        $('.cropResult-base').show();
        var mc = $('#profileimageBox');
        mc.croppie('result', {
            type: 'rawcanvas',
            circle: true,
            size: {
                width: 300,
                height: 300
            },
            format: 'png'
        }).then(function(canvas) {
            $('#save').attr('data-img', canvas.toDataURL());
            $('#cropped_img').attr('src', canvas.toDataURL());

        });
    });

    $(document).on('click', '.save', function(e) {
        var img = $(this).attr('data-img');
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 27,
                img: img
            },
            dataType: 'JSON',
            success: function(res) {
                location.href = "/profile";
            }
        });
        return false;
    });

    $(document).on('click', '.save_petprofile', function() {
        var img = $(this).attr('data-img');
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 98,
                img: img
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    location.href = "/profile";
                }

            }
        });
        return false;
    });

    $(document).on('click', '.savepetimg', function() {
        var img = $(this).attr('data-img');
        setTimeout(function() {
            $.ajax({
                type: 'POST',
                url: 'home/ajax-actions',
                data: {
                    process: 79,
                    img: img
                },
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == "success") {
                        $('.petimage_add').attr('src', 'images/pets/' + res.result.imgname);
                        $('#prof_img').val(res.result.imgname);
                        $('.petimage_add').attr('style', 'display:block;');
                        $('.clsPostPopUp1').click();
                    }
                }
            });
        }, 2000);
        return false;
    });

    $(document).on('click', '#user_imga', function() {
        $('#edit-pet').attr('style', 'display:none;');
    });

    $(document).on('click', '.editpetimg', function() {

        var img = $(this).attr('data-img');

        setTimeout(function() {
            $.ajax({
                type: 'POST',
                url: 'home/ajax-actions',
                data: {
                    process: 79,
                    img: img
                },
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == "success") {
                        $('#editimg_crop').slideUp();
                        $('.popUp-backdrop').removeClass('show');
                        $('.upload_petpic').html('<img src="images/pets/' + res.result.imgname + '" alt="" class="petimage_edit" width="50" height="50" >');
                        //$('.petimage_edit').attr('src','images/pets/'+res.result.imgname);
                        $('#update_img').val(res.result.imgname);
                        $('.petimage_edit').attr('style', 'display:block;');
                        //$('.clsPostPopUp2').click();

                        $('#edit-pet').attr('style', 'display:block;');

                    }
                }
            });
        }, 2000);
        return false;
    });

    $('#img_crop #reset').click(function(e) {
        e.preventDefault();
        resetImage();
    });
    $(document).bind('keyup keydown', function(e) {
        isShiftKeyDown = e.shiftKey;
        if (isShiftKeyDown) {
            canCon.css('cursor', 'ns-resize');
            if (isCaptured) {
                grabCenter = true;
            }
        } else {
            canCon.css('cursor', 'move');
        }
    });
    canCon.on('selectstart', false).on("mousedown.cropper", function(e) {
        var originalPoint = {
            x: e.clientX,
            y: e.clientY
        };
        var originalCoords = {
            x: imageCoords.x,
            y: imageCoords.y,
            scale: imageScale
        };
        if (isShiftKeyDown) {
            startScaling(originalPoint, imageScale);
        }
        grabCenter = false;
        var originalScale = imageScale;
        isCaptured = true;
        $(document).on('mousemove.cropper', function(e) {
            var newPoint = {
                x: e.clientX,
                y: e.clientY
            };
            if (grabCenter) {
                startScaling(newPoint, imageScale);
            }
            var delta = {
                x: newPoint.x - originalPoint.x,
                y: newPoint.y - originalPoint.y
            };

            if (isShiftKeyDown) {
                var moveScale = Math.max(-0.08, -0.000001 * Math.pow(originalCoords.scale * originalSettings.dimensions.minimum, 1.7));
                imageScale = Math.max(imageDimensions.minScale, Math.min(imageDimensions.maxScale, originalScale + (delta.y * moveScale)));
                //console.log('cur='+imageScale);
                //console.log('min,max='+imageDimensions.minScale+','+imageDimensions.maxScale);
                scaleByCenter(imageCoords, imageScale);
            } else {
                imageCoords.x = originalCoords.x + delta.x;
                imageCoords.y = originalCoords.y + delta.y;
            }
            refreshImage();
        }).on('mouseup.cropper', function(e) {
            isCaptured = false;
            $(document).off('mousemove.cropper').off('mouseup.cropper');
            refreshImage();
        });
    });
});

$(document).on('click', '#cancel', function() {
    location.href = "/timeline";
});

$(document).on('click', '#crop', function() {
    $('#save').show();
});


// USer Image cropping ends///

//  Pet image cropping begins //
/*$(function() {
    // properties
    var isCaptured1 = false;
    var thumbSize1 = 100;
    var imageCoords1= {
        x: 0,
        y: 0
    };
    var imageScale1 = 1;
    var imageDimensions1 = {
        width: 0,
        height: 0,
        minScale: 0.01,
        maxScale: 1
    }
    var currentImage1 = null;
    var originalSettings1 = {
        coords: {
            x: 0,
            y: 0,
        },
        scale: 1,
        dimensions: {
            width: 0,
            height: 0,
            minimum: thumbSize1
        }
    };
    var scaleCenter1 = {
        x: 0,
        y: 0
    };
    var grabCenter1 = false;
    var isShiftKeyDown1 = false;

    // dom dependencies
    var canvas1 = document.getElementById('imageCanvas_pet');
    if(canvas1!=null)
        var ctx1 = canvas1.getContext('2d');
    var canCon1 = $('#img_crop_pet').find('.canvasCon');

    // methods
    function clearCanvas1() {
        ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    }
    function refreshImage1() {  
        clearCanvas1();
        boxed1();
        ctx1.drawImage(currentImage1,
            imageCoords1.x, imageCoords1.y,
            imageDimensions1.width * imageScale1, imageDimensions1.height * imageScale1);
    }
    function resetImage1() {
        if (!currentImage1) return;
        imageDimensions1.width = originalSettings1.dimensions.width;
        imageDimensions1.height = originalSettings1.dimensions.height;
        imageScale1 = originalSettings1.scale;
        imageCoords1.x = originalSettings1.coords.x;
        imageCoords1.y = originalSettings1.coords.y;

        refreshImage1();
    }
    function handleImage1(e){ 
        var reader1 = new FileReader();
        reader1.onload = function(event){
            currentImage1 = new Image();
            currentImage1.onload = function(){
                imageCoords1.x = 0;
                imageCoords1.y = 0;
                originalSettings1.dimensions.width = currentImage1.width;
                imageDimensions1.width = currentImage1.width;
                originalSettings1.dimensions.height = currentImage1.height;
                imageDimensions1.height = currentImage1.height;
                var maxDim = Math.max(imageDimensions1.height, imageDimensions1.width);
                var minDim = originalSettings1.dimensions.minimum =  Math.min(imageDimensions1.height, imageDimensions1.width);
                
                imageScale1 = 1;
                originalSettings1.dimensions.scale = 1;
                imageDimensions1.maxScale = 1;
                if (maxDim > canvas1.width) {
                    imageScale1 =
                    originalSettings1.dimensions.scale = canvas1.width / maxDim;
                }
                imageDimensions1.minScale = thumbSize1 / minDim;
                boxed1();
                // center image
                var above1 = thumbSize1 - imageCoords1.y;
                var below1 = imageCoords1.y + (imageDimensions1.height * imageScale1) - (thumbSize1 * 2);
                var overlap1 = (above1 + below1) / 2;
                
                imageCoords1.y += (above1 - overlap1);
                
                above1 = thumbSize1 - imageCoords1.x;
                below1 = imageCoords1.x + (imageDimensions1.width * imageScale1) - (thumbSize1 * 2);
                overlap1 = (above1 + below1) / 2;
                
                imageCoords1.x += (above1 - overlap1);

                canCon1.show();
                $('#crop_pet,.instructions_pet').show();
                 
                refreshImage1();
            }
            currentImage1.src = event.target.result;
             
        }
        reader1.readAsDataURL(e.target.files[0]);     
    }
    function startScaling1(newPoint, scale) {
        scaleCenter1.y = imageCoords1.y + ((originalSettings1.dimensions.height * scale) / 2);        
        scaleCenter1.x = imageCoords1.x + ((originalSettings1.dimensions.width * scale) / 2);
        grabCenter1 = false;
    }
    function scaleByCenter1(coords, scale) {
        coords.y = scaleCenter1.y - ((originalSettings1.dimensions.height * scale) / 2);
        coords.x = scaleCenter1.x - ((originalSettings1.dimensions.width * scale) / 2);
    }
    // referee who makes sure the image is in the box
    function boxed1() {
        imageCoords1.x = Math.min(thumbSize1,imageCoords1.x);
        imageCoords1.y = Math.min(thumbSize1,imageCoords1.y);
        
        imageCoords1.x = Math.max(imageCoords1.x, (thumbSize1 * 2) - (imageDimensions1.width * imageScale1));
        imageCoords1.y = Math.max(imageCoords1.y, (thumbSize1 * 2) - (imageDimensions1.height * imageScale1));
    }

    // event handlers
    $('#imageLoader_pet').on('change', handleImage1);
    $('#crop_pet').click(function(e) {
        e.preventDefault();
         
        if (!currentImage1) return;        
        var cropCanvas1 = $('#cropCanvas_pet').get(0);
        cropCanvas1.getContext('2d').drawImage(canvas1,
            thumbSize1, thumbSize1, thumbSize1, thumbSize1,
            0, 0, thumbSize1, thumbSize1);
        var newPhotoUri1 = cropCanvas1.toDataURL('image/jpeg');
        $('#save_pet').attr('data-img',newPhotoUri1);
        $('#img_crop_pet').find('.cropResult img').attr('src', newPhotoUri1);
        $('#img_crop_pet').find('.cropResult').show();
    });
    
    $(document).on('click','#save_pet',function(){
        var img = $(this).attr('data-img');
          $.ajax({
            type:'POST',
            url:'home/ajax-actions',
            data:{process:28, img:img},
            dataType: 'JSON',
            success:function(res){
                location.href="/timeline";
            }
        });
        return false;       
    });
    
    $('#img_crop_pet #reset').click(function(e) {
        e.preventDefault();
        resetImage1();
    });
    $(document).bind('keyup keydown', function (e) {
        isShiftKeyDown1 = e.shiftKey;
        if (isShiftKeyDown1) {
            canCon1.css('cursor', 'ns-resize');
            if (isCaptured1) {
                grabCenter1 = true;
            }
        } else {
            canCon1.css('cursor', 'move');
        }
    });
    canCon1.on('selectstart', false).on("mousedown.cropper", function (e) {
        var originalPoint1 = {
            x: e.clientX,
            y: e.clientY
        };
        var originalCoords1 = {
            x: imageCoords1.x,
            y: imageCoords1.y,
            scale: imageScale1
        };
        if (isShiftKeyDown1) {
           startScaling1(originalPoint1, imageScale1);
        }
        grabCenter1 = false;
        var originalScale1 = imageScale1;
        isCaptured1 = true;
        $(document).on('mousemove.cropper', function (e) {
            var newPoint1 = {
                x: e.clientX,
                y: e.clientY
            };
            if (grabCenter1) {
                startScaling1(newPoint1, imageScale1);
            }
            var delta1 = {
                x: newPoint1.x - originalPoint1.x,
                y: newPoint1.y - originalPoint1.y
            };

            if (isShiftKeyDown1) {
                var moveScale1 = Math.max(-0.08, -0.000001 * Math.pow(originalCoords1.scale * originalSettings1.dimensions.minimum, 1.7));
                imageScale1 = Math.max(imageDimensions1.minScale, Math.min(imageDimensions1.maxScale, originalScale1 + (delta1.y * moveScale1)));
                console.log('cur='+imageScale1);
                console.log('min,max='+imageDimensions1.minScale+','+imageDimensions1.maxScale);
                scaleByCenter1(imageCoords1, imageScale1);
            } else {
                imageCoords1.x = originalCoords1.x + delta1.x;
                imageCoords1.y = originalCoords1.y + delta1.y;
            }
            refreshImage1();
        }).on('mouseup.cropper', function (e) {
            isCaptured1 = false;
            $(document).off('mousemove.cropper').off('mouseup.cropper');
            refreshImage1();
        });
    });
});

$(document).on('click','#cancel',function(){
     location.href="/timeline";
});

$(document).on('click','#crop_pet',function(){
    $('#save_pet').show();
});


$(document).on('click','#user_img, #pet_img',function(){
    $('.canvasCon').hide();
    $('.cropResult').hide();
    $('.save').hide();
}); 
// pet image croping ends // 
*/

//Youtube video link in header//
$('a.youtube-video').fancybox({
    type: 'iframe'
});
//--// 

function dateFormatz(aDate) {

    var day = aDate.getDate();
    var month = aDate.getMonth() + 1;
    var year = aDate.getFullYear();
    var recDate = day + '-' + month + '-' + year;

    var today = new Date();
    var t_day = today.getDate();
    var t_month = today.getMonth() + 1;
    var t_year = today.getFullYear();
    var curDate = t_day + '-' + t_month + '-' + t_year;
    var yesDate = (t_day - 1) + '-' + t_month + '-' + t_year;
    var yesDateBefore = (t_day - 2) + '-' + t_month + '-' + t_year;

    var dateString = '';
    if (recDate == curDate) dateString = 'Heute';
    else if (recDate == yesDate) dateString = 'Gestern';
    else if (recDate == yesDateBefore) dateString = 'Vorgestern ';
    else dateString = aDate.toDateString().split(' ').slice(1).join(' ');

    return dateString;
}



$(document).on('click', '.comments_display', function() {
    var postid = $(this).attr('data-postid');
    var createdby = $(this).attr('data-createdby');
    var commentedby = $(this).attr('data-commented-user');

    $('.first_comment' + postid + '').hide();

    //$('.recent_comment'+postid).hide();   
    /* $('.comments_list').html(''); 
    $('.comment_image').html(''); */

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 33,
            postid: postid,
            created: createdby,
            commentedby: commentedby
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {

                var cmnt = res.result.comments;
                var replies = res.result.replies;
                var cmt = '';

                if (checkNotEmpty(cmnt)) {
                    $('.allcomment_' + postid).html('');
                    $.each(cmnt, function(index, res) {

                        var date = new Date(res.created_date); //convert the date format
                        var date_time = dateFormatz(date);

                        var profile_pic = (res.profile_pic) ? (res.profile_pic) : 'dummy_user.jpg';
                        var pet_pic = (res.pet_profile_pic) ? (res.pet_profile_pic) : 'dummy_pet.jpg';

                        var like_cnt = '';
                        var likes = 'Gefälltmir';
                        if (res.likes) {
                            like_cnt = res.likes;
                        }
                        if (res.likes > 1) {
                            likes = 'Gefälltmir';
                        }

                        cmt = '<div class="form-row reply cmnt_' + res.id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + res.username + '</span>' + res.comments;

                        if (res.image) { //available image comment displayed  
                            cmt += '<p><a data-fancybox="" href="images/comment_images/' + res.image + '"><img src="images/comment_images/' + res.image + '" height="80"></a></p>';
                        }

                        cmt += '</div> <div class="comment-settings"><div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + res.id + '" href="javascript:;" data-cmt="' + res.id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + res.id + ' " href="javascript:;" data-cmt="' + res.id + '"  data-postid="' + res.post_id + '">Delete Kommentieren</a> </div></div>  </div></div> <div class="col-lg-12 my-auto p-0"> <div class="like-comment-sec " > <a href="javascript:;" class="like_comment" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '"> ' + like_cnt + ' ' + likes + '  </a><a href="javascript:;" class="reply_open reply_comment" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '" >Antworten</a><a href="javascript:;" class="post-time">' + date_time + '</a> </div>';

                        if (checkNotEmpty(replies)) {
                            var i = 0;
                            $.each(replies, function(indx, reply) {
                                if (res.id == reply.comment_id && i == 0) {
                                    i = i + 1;
                                    cmt += '<div class="reply_toggle"><a href="javascript:;" class="repliess"  data-cmntid="' + res.id + '">Antwortet<i class="fa fa-angle-down" aria-hidden="true"></i> </a></div>';
                                }
                            });
                        }

                        cmt += '</div></div>     <div class="reply_comment' + res.id + '"> </div> <div class="comments_toggle' + res.id + '" style="display: none"> ';

                        if (checkNotEmpty(replies)) {
                            $.each(replies, function(index, reply) {
                                if (res.id == reply.comment_id) {
                                    var rep_date = new Date(reply.created_date);
                                    var rep_datetime = dateFormatz(rep_date);

                                    var profile_pic = (reply.profile_pic) ? (reply.profile_pic) : 'dummy_user.jpg';
                                    var pet_pic = (reply.pet_profile_pic) ? (reply.pet_profile_pic) : 'dummy_pet.jpg';

                                    cmt += '<div class="form-row comment-list reply_' + reply.id + ' cmnt_' + reply.comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3 my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2 "><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div> <div class="col-lg-10 col-md-9 col-sm-10 col-9 my-auto p-0"><div class="first-comment"> <span>' + reply.username + '</span>' + reply.reply_message + '</div><div class="comment-settings"> <div class="dropdown"> <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item del_reply" href="javascript:;" data-cmt="' + reply.comment_id + '" data-reply="' + reply.id + '">Delete Antworten</a> </div> </div> </div>';

                                    if (reply.reply_image) {
                                        cmt += '<p><a data-fancybox="" href="images/comment_images/' + reply.reply_image + '"><img src="images/comment_images/' + reply.reply_image + '" height="80"></a></p>';
                                    }

                                    cmt += '</div></div>';

                                }
                            });
                        }
                        //$('.comments_list'+res.post_id).html(cmt);
                        //$('.comments_list').append(cmt);  
                        cmt += '</div></div>  <div class="commentsBoxDisplay' + res.id + '" style="display: block;"> </div>  ';
                        $('.allcomment_' + postid).append(cmt);


                        //--for reply comments--//
                        var replysec = '<div class="comment_section' + res.id + '"> <div class="footer-image-upload reply_open_box' + res.id + ' pr-1 pt-1 " style="display: none;"> <div class="commentreply_' + res.id + '"> <input type="text" class="form-control b-ras-30 reply_post reply_' + res.id + '" id="enter_reply" placeholder="Antworten" data-postid="' + postid + '" data-createdby="' + createdby + '" data-commented-user="' + commentedby + '"   value="">  </div> <input type="hidden" id="replyImage" name="replyImage" value="">     <a href="javascript:;"  class="replyImgUploadAppend"  data-cmntid="' + res.id + '"  > <img src="home/images/svg/camera-grey.svg"></a> <input style="display:none;" class="replyImgUpload" name="replyImageUpload" id="replyImageUpload' + res.id + '" value="" type="file" data-cmntid="' + res.id + '" data-postid="' + postid + '"  accept=".jpg,.jpeg,.png"> </div> <div class="reply_image' + res.id + '"></div> </div>';

                        //--end--// 
                        $('.commentsBoxDisplay' + res.id).append(replysec);
                    });



                    //$('.allcomment_'+postid).append(replysec);                    


                    cmt += '<div class="recent_comment' + postid + '"> </div>';
                    //$('.recent_comment'+postid).hide();
                    //$('.allcomment_'+postid).append(cmt);              
                }
            }
        }
    });

    return false;



});




$(document).on('click', '.repliess', function() {
    var cmntid = $(this).attr('data-cmntid');
    $('.comments_toggle' + cmntid).slideToggle();
    $(this).addClass('active');
    setTimeout(function() {
        $('.active').addClass('act');
    }, 500);
});

$(document).on('click', '.comments_display_wall', function() {

    var postid = $(this).attr('data-postid');
    var createdby = $(this).attr('data-createdby');
    var commentedby = $(this).attr('data-commented-user');
    var loggeduser = $(this).attr('data-loggeduser');
    var postby = $(this).attr('data-postcreated');
    //$('.recent_comment'+postid).hide();

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 33,
            postid: postid,
            created: createdby,
            commentedby: commentedby
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {

                var cmnt = res.result.comments;
                var replies = res.result.replies;
                var cmt = '';


                if (checkNotEmpty(cmnt)) {
                    $('.allcomment_' + postid).html('');
                    $.each(cmnt, function(index, res) {

                        var date = new Date(res.created_date); //convert the date format
                        var date_time = dateFormatz(date);

                        var profile_pic = (res.profile_pic) ? (res.profile_pic) : 'dummy_user.jpg';
                        var pet_pic = (res.pet_profile_pic) ? (res.pet_profile_pic) : 'dummy_pet.jpg';

                        var like_cnt = '';
                        var likes = 'Gefälltmir';
                        if (res.likes) {
                            like_cnt = res.likes;
                        }
                        if (res.likes > 1) {
                            likes = 'Gefälltmir';
                        }


                        cmt = '<div class="form-row cmnt_' + res.id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + res.username + '</span>' + res.comments;

                        if (res.image) { //available image comment displayed  
                            cmt += '<p><a data-fancybox="" href="images/comment_images/' + res.image + '"><img src="images/comment_images/' + res.image + '" height="80"></a></p>';
                        }

                        cmt += '</div><div class="comment-settings">';


                        if (loggeduser == postby || res.created_by == loggeduser) {
                            cmt += '<div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + res.id + '" href="javascript:;" data-cmt="' + res.id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + res.id + ' " href="javascript:;" data-cmt="' + res.id + '"  data-postid="' + res.post_id + '">Delete Kommentieren</a> </div></div>';
                        }
                        cmt += '</div></div><div class="col-lg-12 my-auto p-0"> <div class="like-comment-sec " > <a href="javascript:;" class="like_comment" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '"> ' + like_cnt + ' ' + likes + '  </a><a href="javascript:;"  class="reply_open reply_comment dropreplybox" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '" >Antworten</a><a href="javascript:;" class="post-time">' + date_time + '</a> </div>    ';

                        if (checkNotEmpty(replies)) {
                            var i = 0;
                            $.each(replies, function(indx, reply) {
                                if (res.id == reply.comment_id && i == 0) {
                                    i = i + 1;
                                    cmt += '<div class="reply_toggle"><a href="javascript:;" class="repliess"  data-cmntid="' + res.id + '">Antwortet<i class="fa fa-angle-down" aria-hidden="true"></i> </a></div>';
                                }
                            });
                        }

                        cmt += '</div></div>     <div class="reply_comment' + res.id + '"> </div> <div class="comments_toggle' + res.id + '" >';

                        if (checkNotEmpty(replies)) {
                            $.each(replies, function(indx, reply) {
                                if (res.id == reply.comment_id) {
                                    var rep_date = new Date(reply.created_date);
                                    var rep_datetime = dateFormatz(rep_date);

                                    var profile_pic = (reply.profile_pic) ? (reply.profile_pic) : 'dummy_user.jpg';
                                    var pet_pic = (reply.pet_profile_pic) ? (reply.pet_profile_pic) : 'dummy_pet.jpg';

                                    cmt += '<div class="form-row comment-list reply_' + reply.id + ' cmnt_' + reply.comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3 my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2 "><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div> <div class="col-lg-10 col-md-9 col-sm-10 col-9 my-auto p-0"><div class="first-comment"> <span>' + reply.username + '</span>' + reply.reply_message + '</div><div class="comment-settings"> <div class="dropdown"> <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item del_reply" href="javascript:;" data-cmt="' + reply.comment_id + '" data-reply="' + reply.id + '">Delete Antworten</a> </div> </div> </div>';

                                    if (reply.reply_image) {
                                        cmt += '<p><a data-fancybox="" href="images/comment_images/' + reply.reply_image + '"><img src="images/comment_images/' + reply.reply_image + '" height="80"></a></p>';
                                    }

                                    cmt += '</div></div>';

                                }
                            });
                        }
                        cmt += '</div></div>  <div class="commentsBoxDisplay' + res.id + '" style="display: block;"> </div>  ';
                        $('.allcomment_' + postid).append(cmt);

                        //--for reply comments--//
                        var replysec = '<div class="comment_section' + res.id + '"> <div class="footer-image-upload reply_open_box' + res.id + ' pr-1 pt-1 " style="display: none;"> <div class="commentreply_' + res.id + '"> <input type="text" class="form-control b-ras-30 reply_post reply_' + res.id + '" id="enter_reply" placeholder="Antworten" data-postid="' + postid + '" data-createdby="' + createdby + '" data-commented-user="' + commentedby + '"   value="">  </div> <input type="hidden" id="replyImage" name="replyImage" value="">     <a href="javascript:;"  class="replyImgUploadAppend"  data-cmntid="' + res.id + '" > <img src="home/images/svg/camera-grey.svg"></a> <input style="display:none;" name="replyImageUpload"  class="replyImgUpload" id="replyImageUpload' + res.id + '" value="" type="file" data-postid="' + postid + '"  data-cmntid="' + res.id + '"   accept=".jpg,.jpeg,.png"> </div> <div class="reply_image' + res.id + '"></div> </div>';

                        //--end--// 
                        $('.commentsBoxDisplay' + res.id).append(replysec);
                    });

                    cmt += '<div class="recent_comment' + postid + '"> </div>';
                    // $('.recent_comment'+postid).hide();
                    $('.allcomment_' + postid).append(cmt);


                }
            }
        }
    });


});



$(document).on('click', '.comments_display_group', function() {

    var postid = $(this).attr('data-postid');
    var createdby = $(this).attr('data-createdby');
    var commentedby = $(this).attr('data-commented-user');
    var loggeduser = $(this).attr('data-loggeduser');
    var postby = $(this).attr('data-postcreated');
    var groupid = $(this).attr('data-groupid');

    //$('.recent_comment'+postid).hide();

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 86,
            groupid: groupid,
            postid: postid,
            created: createdby,
            commentedby: commentedby
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {

                var cmnt = res.result.comments;
                var replies = res.result.replies;
                var cmt = '';

                if (checkNotEmpty(cmnt)) {
                    $('.allcomment_' + postid).html('');
                    $.each(cmnt, function(index, res) {

                        var date = new Date(res.created_date); //convert the date format
                        var date_time = dateFormatz(date);

                        var profile_pic = (res.profile_pic) ? (res.profile_pic) : 'dummy_user.jpg';
                        var pet_pic = (res.pet_profile_pic) ? (res.pet_profile_pic) : 'dummy_pet.jpg';

                        var like_cnt = '';
                        var likes = 'Gefälltmir';
                        if (res.likes) {
                            like_cnt = res.likes;
                        }
                        if (res.likes > 1) {
                            likes = 'Gefälltmir';
                        }


                        cmt = '<div class="form-row cmnt_' + res.id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + res.username + '</span>' + res.comments;

                        if (res.image) { //available image comment displayed  
                            cmt += '<p><a data-fancybox="" href="images/comment_images/' + res.image + '"><img src="images/comment_images/' + res.image + '" height="80"></a></p>';
                        }

                        cmt += '</div><div class="comment-settings">';


                        if (loggeduser == postby || res.created_by == loggeduser) {
                            cmt += '<div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + res.id + '" href="javascript:;" data-cmt="' + res.id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + res.id + ' " href="javascript:;" data-cmt="' + res.id + '"  data-postid="' + res.post_id + '">Delete Kommentieren</a> </div></div>';
                        }
                        cmt += '</div></div><div class="col-lg-12 my-auto p-0"> <div class="like-comment-sec " > <a href="javascript:;" class="like_group_comment cmt_like' + res.id + '" data-groupid="' + groupid + '" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '"> ' + like_cnt + ' ' + likes + '  </a><a href="javascript:;"  class="reply_open reply_comment_group dropreplybox" data-groupid="' + groupid + '" data-comment-id="' + res.id + '" data-post-id="' + res.post_id + '" >Antworten</a><a href="javascript:;" class="post-time">' + date_time + '</a> </div>    ';

                        if (checkNotEmpty(replies)) {
                            var i = 0;
                            $.each(replies, function(indx, reply) {
                                if (res.id == reply.comment_id && i == 0) {
                                    i = i + 1;
                                    cmt += '<div class="reply_toggle"><a href="javascript:;" class="repliess"  data-cmntid="' + res.id + '">Antwortet<i class="fa fa-angle-down" aria-hidden="true"></i> </a></div>';
                                }
                            });
                        }

                        cmt += '</div></div>     <div class="reply_comment' + res.id + '"> </div> <div class="comments_toggle' + res.id + '">';

                        if (checkNotEmpty(replies)) {
                            $.each(replies, function(indx, reply) {
                                if (res.id == reply.comment_id) {
                                    var rep_date = new Date(reply.created_date);
                                    var rep_datetime = dateFormatz(rep_date);

                                    var profile_pic = (reply.profile_pic) ? (reply.profile_pic) : 'dummy_user.jpg';
                                    var pet_pic = (reply.pet_profile_pic) ? (reply.pet_profile_pic) : 'dummy_pet.jpg';

                                    cmt += '<div class="form-row comment-list reply_' + reply.id + ' cmnt_' + reply.comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3 my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + profile_pic + '"></div></div><div class="media-body pl-2 "><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + pet_pic + '"></div></div></div></div> <div class="col-lg-10 col-md-9 col-sm-10 col-9 my-auto p-0"><div class="first-comment"> <span>' + reply.username + '</span>' + reply.reply_message + '</div><div class="comment-settings"> <div class="dropdown"> <a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item del_reply" href="javascript:;" data-cmt="' + reply.comment_id + '" data-reply="' + reply.id + '">Delete Antworten</a> </div> </div> </div>';

                                    if (reply.reply_image) {
                                        cmt += '<p><a data-fancybox="" href="images/comment_images/' + reply.reply_image + '"><img src="images/comment_images/' + reply.reply_image + '" height="80"></a></p>';
                                    }

                                    cmt += '</div></div>';

                                }
                            });
                        }
                        cmt += '</div></div>  <div class="commentsBoxDisplay' + res.id + '" style="display: block;"> </div>  ';
                        $('.allcomment_' + postid).append(cmt);

                        //--for reply comments--//
                        var replysec = '<div class="comment_section' + res.id + '"> <div class="footer-image-upload reply_open_box' + res.id + ' pr-1 pt-1 " style="display: none;"> <div class="commentreply_' + res.id + '"> <input type="text" class="form-control b-ras-30 reply_post reply_' + res.id + '" id="enter_reply" placeholder="Antworten" data-postid="' + postid + '" data-createdby="' + createdby + '" data-commented-user="' + commentedby + '"   value="">  </div> <input type="hidden" id="replyImage" name="replyImage" value="">     <a href="javascript:;"  class="replyImgUploadAppend"  data-cmntid="' + res.id + '" > <img src="home/images/svg/camera-grey.svg"></a> <input style="display:none;" name="replyImageUpload"  class="replyImgUpload" id="replyImageUpload' + res.id + '" value="" type="file" data-postid="' + postid + '"  data-cmntid="' + res.id + '"   accept=".jpg,.jpeg,.png"> </div> <div class="reply_image' + res.id + '"></div> </div>';

                        //--end--// 
                        $('.commentsBoxDisplay' + res.id).append(replysec);
                    });

                    cmt += '<div class="recent_comment' + postid + '"> </div>';
                    $('.recent_comment' + postid).hide();
                    //$('.allcomment_'+postid).append(cmt);     


                }
            }
        }
    });


});



$(document).on('click', '.post_like', function() {
    var postid = $(this).attr('data-postid');
    var postedby = $(this).attr('data-postedby');
    var userid = $(this).attr('data-userid');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 34,
            postid: postid,
            userid: userid,
            postedby: postedby
        },
        success: function(res) {
            if (res.result.status == "success") {

                var likes = '<img src="home/images/svg/like-grey.svg"> ' + res.result.likes + ' Gefälltmir';

                if (res.result.likes == 0) {
                    $('.like_button' + postid).html('<img src="home/images/svg/like-grey.svg"> Gefälltmir');
                } else {
                    $('.like_button' + postid).html(likes);
                }

                if ($('.like_button' + postid).hasClass('hightlight')) {

                    $('.like_button' + postid).removeClass('hightlight');
                } else {
                    $('.like_button' + postid).addClass('hightlight');
                }
            }
        }
    });
    return false;
});



$(document).on('click', '.group_post_like', function() {
    var groupid = $(this).attr('data-groupid');
    var postid = $(this).attr('data-postid');
    var postedby = $(this).attr('data-postedby');
    var userid = $(this).attr('data-userid');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 89,
            groupid: groupid,
            postid: postid,
            userid: userid,
            postedby: postedby
        },
        success: function(res) {
            if (res.result.status == "success") {

                var likes = '<img src="home/images/svg/like-grey.svg"> ' + res.result.likes + 'Gefälltmir';
                if (res.result.likes == 0) {
                    $('.like_button' + postid).html('<img src="home/images/svg/like-grey.svg"> Gefälltmir');
                } else {
                    $('.like_button' + postid).html(likes);
                }
                if ($('.like_button' + postid).hasClass('hightlight')) {

                    $('.like_button' + postid).removeClass('hightlight');
                } else {
                    $('.like_button' + postid).addClass('hightlight');
                }
            }
        }
    });
    return false;
});




/*  $(document).on('click','.like_button',function(){
    if( $(this).hasClass('active')){
        $(this).removeClass('active');
    }else{
        $(this).addClass('active');
    }
}); */



$(document).on('click', '.like_comment', function() {
    var postid = $(this).attr('data-post-id');
    var commentid = $(this).attr('data-comment-id');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 35,
            postid: postid,
            commentid: commentid
        },
        success: function(res) {
            if (res.result.status == "success") {
                console.log(res.result.likes);
                var likes = res.result.likes + 'Gefälltmir';
                if (res.result.likes == 0) {
                    $('.cmt_like' + commentid).html('Gefälltmir');
                } else {
                    $('.cmt_like' + commentid).html(likes);
                }

            }
        }
    });
    return false;
});

$(document).on('click', '.like_group_comment', function() {

    var groupid = $(this).attr('data-group-id');
    var postid = $(this).attr('data-post-id');
    var commentid = $(this).attr('data-comment-id');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 88,
            groupid: groupid,
            postid: postid,
            commentid: commentid
        },
        success: function(res) {
            if (res.result.status == "success") {
                var likes = res.result.likes + 'Gefälltmir';
                if (res.result.likes == 0) {
                    $('.cmt_like' + commentid).html('Gefälltmir');
                } else {
                    $('.cmt_like' + commentid).html(likes);
                }
            }
        }
    });
    return false;
});



$(document).on('change', '.commentImgUpload', function() {

    var postid = $(this).attr('data-postid');

    var file = $(this).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(file);

    var img = '<ul class="upload-images-list mt-2 "> <li class="mb-0"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="100" height="100"></li></ul>';

    $('.comment_image' + postid).html(img);


    var form_data = new FormData();
    form_data.append('file', file);
    form_data.append('process', 36);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.result.status == "success") {

                $('#commentImage').val(res.result.imgname);
            }
            if (res.result.status == "invalid") {

                alertify.alert(res.result.message);
            }
        }
    });
    return false;
});

$(document).on('change', '.replyImgUpload', function() {

    var cmntid = $(this).attr('data-cmntid');


    var file = $(this).prop("files")[0];
    /*  var imagename = file.name;
    var imagetype = file.type; */

    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(file);

    var img = '<ul class="upload-images-list mt-2 "> <li class="mb-0"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="100" height="100"></li></ul>';
    console.log(file);
    $('.reply_image' + cmntid).html(img);

    var form_data = new FormData();
    form_data.append('file', file);
    form_data.append('process', 36);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            if (res.result.status == "success") {

                $('#replyImage').val(res.result.imgname);
            }
            if (res.result.status == "invalid") {

                alertify.alert(res.result.message);
            }
        }
    });
    return false;
});


$(document).on('click', '.reply_comment', function() {

    var postid = $(this).attr('data-post-id');
    var commentid = $(this).attr('data-comment-id');
    //var btn = '<a class="btn btn-primary btn-gradient-light btn-publish reply_post" data-postid="'+postid+'"  data-cmntid="'+commentid+'" href="javascript:;" >Reply</a>';

    var txt = '<input type="text" class="form-control b-ras-30 reply_post" id="enter_reply" placeholder="Antworten.. " data-postid="' + postid + '" data-commentid="' + commentid + '"  value="">';

    //$('.commentreply_'+postid).html(txt);
    $('.commentreply_' + commentid).html(txt);

    $('.reply_' + commentid).focus();
});

$(document).on('keyup', '.reply_post_group', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    var groupid = $(this).attr('data-groupid');
    var post = $(this).attr('data-postid');
    var cmnt = $(this).attr('data-commentid');
    var reply = $(this).val();
    var imagee = $('#replyImage').val();

    if (keycode == 13) {
        if (checkNotEmpty(reply) || checkNotEmpty(imagee)) {
            $.ajax({
                type: 'POST',
                url: 'home/ajax-actions',
                data: {
                    postid: post,
                    cmntid: cmnt,
                    reply: reply,
                    imagee: imagee,
                    groupid: groupid,
                    process: 87
                },
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == "success") {
                        location.reload();
                    }
                }
            });
            return false;
        }
    }
});



$(document).on('click', '.reply_comment_group', function() {
    var groupid = $(this).attr('data-groupid');
    var postid = $(this).attr('data-post-id');
    var commentid = $(this).attr('data-comment-id');

    var txt = '<input type="text" class="form-control b-ras-30 reply_post_group" id="enter_reply_group" placeholder="Antworten.. " data-groupid="' + groupid + '" data-postid="' + postid + '" data-commentid="' + commentid + '"  value="">';

    $('.commentreply_' + commentid).html(txt);

    $('.reply_' + commentid).focus();
});

$(document).on('keyup', '.reply_post', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    var post = $(this).attr('data-postid');
    var cmnt = $(this).attr('data-commentid');
    var reply = $(this).val();
    var imagee = $('#replyImage').val();

    if (keycode == 13) {
        if (checkNotEmpty(reply) || checkNotEmpty(imagee)) {
            $.ajax({
                type: 'POST',
                url: 'home/ajax-actions',
                data: {
                    postid: post,
                    cmntid: cmnt,
                    reply: reply,
                    imagee: imagee,
                    process: 37
                },
                dataType: 'JSON',
                success: function(res) {
                    if (res.result.status == "success") {
                        location.reload();
                    }
                }
            });
            return false;
        }
    }
});


$(document).on('click', '.reply_post', function() {

});

$(document).on('click', '.send_request', function() {
    var sender = $(this).attr('data-sender');
    var receiver = $(this).attr('data-receiver');

    $(this).removeClass('send_request');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            sender: sender,
            receiver: receiver,
            process: 38
        },
        dataType: 'JSON',
        success: function(res) {
            /* alertify.alert('Friend request sent',function(){
                location.reload();
            }); */

            if (res.result.status == "success") {
                $('.req_' + receiver).addClass('Anfrage_gesendet');
                $('.req_' + receiver).html('Anfrage abbrechen');
            }
        }
    });
});

$(document).on('click', '.Anfrage_gesendet', function() {
    var sender = $(this).attr('data-sender');
    var receiver = $(this).attr('data-receiver');

    $(this).removeClass('send_request');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            sender: sender,
            receiver: receiver,
            process: 113
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.req_' + receiver).removeClass('Anfrage_gesendet');
                $('.req_' + receiver).addClass('send_request');
                $('.req_' + receiver).html('<i class="fa fa-user-plus" aria-hidden="true"></i><span>Anfrage senden</span>');

            }
        }
    });
});


$(document).on('click', '.remove-suggestion', function() {
    //$(this).closest("li").remove();
    var id = $(this).attr('data-receiver');
    $('.suggestion' + id + '').hide();
});

$(document).on('click', '.accept_request', function() {
    var req_id = $(this).attr('data-requestid');
    var sender = $(this).attr('data-senderid');

    var requested_by = $(this).attr('data-reqsender');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 39,
            req_id: req_id,
            sender: sender
        },
        dataType: 'JSON',
        success: function(res) {

            if (res.result.status == "success") {
                var sender = res.result.sender;

                var txt = 'ist jetzt dein Freund';
                $('.frndacc_' + req_id + '').html(txt);

                $('.options' + req_id).hide();
            }
        }
    });
    return false;
});

$(document).on('click', '.decline_request', function() {
    var req_id = $(this).attr('data-reqid');


    // alertify.confirm('Do you want to delete this friend request ? ',function(res){  
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 40,
            reqid: req_id
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                //$('.dec_'+req_id+'').closest("li").remove();

                $('.req_' + req_id).remove();
            }
        }
    });
    return false;
    // });
});

$(document).on('click', '.notify_post', function() {
    var notify_id = $(this).attr('data-notifyid');
    var encrypt_id = $(this).attr('data-post-cryptid');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 41,
            id: notify_id,
            encrypt_id: encrypt_id
        },
        dataType: 'JSON',
        success: function(res) {

            location.href = 'notificationinfo?id=' + encrypt_id;
        }
    });

});

$(document).on('click', '.petowner, .otherprofile', function() {
    var id = $(this).attr('data-ownerid');
    location.href = 'profileinfo?id=' + id;
});

//-- Chat min max hide show --//

$(document).on('click', '#min', function() {
    $('#min').hide();
    $('#max').show();
});
$(document).on('click', '#max', function() {
    $('#min').show();
    $('#max').hide();
});
//---//


$(document).on('click', '.comments_display, .comments_display_wall, .comments_display_group', function() {
    $(this).hide();
});

//--save unsave post--//

$(document).on('click', '.savepost', function() {
    var postid = $(this).attr('data-postid');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 46,
            postid: postid
        },
        dataType: 'JSON',
        success: function(res) {

            if (res.result.status == 'saved') {
                $('.save' + postid).html('Saved');
            }
            if (res.result.status == 'deleted') {
                $('.save' + postid).html('Save Post');
            }

        }
    });
    return false;
});
//--//

//-- Hide timeline--//
$(document).on('click', '.hide', function() {
    var postid = $(this).attr('data-postid');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 47,
            postid: postid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == 'Hide') {
                $('.hide' + postid).html('Unhide');
            }
            if (res.result.status == 'Unhide') {
                $('.hide' + postid).html('Hide from Timeline');
            }
        }
    });
});
//---//

//--Delete Timeline--//
$(document).on('click', '.delete', function() {
    var postid = $(this).attr('data-postid');
    //alertify.confirm('Are you want to delete ?',function(res){
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 48,
            postid: postid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.post' + postid).hide();
            }
        }
    });
    return false;
    //});
});
//--//


$(document).on('click', '#petdob', function() {

    $("#petdob").datepicker({
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        dateFormat: 'dd.mm.yy'
    });

});

$(document).on('click', '.notify_off', function() {
    var postid = $(this).attr('data-postid');
    var notify = $(this).attr('data-notification');

    var change_notify = '';
    if (notify == 2) {
        $('.notify' + postid).html('Turn off Notifications');
        $('.notify' + postid).attr('data-notification', 1);
        change_notify = 1;
    } else {
        $('.notify' + postid).html('Turn on Notifications');
        $('.notify' + postid).attr('data-notification', 2);
        change_notify = 2;
    }

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 49,
            postid: postid,
            notify: change_notify
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {

            }
        }
    });
    return false;
});

$(document).on('click', '.crop_cancel', function() {
    location.reload();
});

$(document).on('click', '.hide_cmnt', function() {
    var cmt = $(this).attr('data-cmt');


    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 52,
            cmt: cmt
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == 'Hide') {
                $('.hide_cmnt' + cmt).html('Unhide Kommentieren');
            }
            if (res.result.status == 'Unhide') {
                $('.hide_cmnt' + cmt).html('Hide Kommentieren');
            }
        }
    });
    return false;
});

$(document).on('click', '.del_cmnt', function() {
    var cmtid = $(this).attr('data-cmt');
    var postid = $(this).attr('data-postid');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 53,
            cmtid: cmtid,
            postid: postid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.cmnt_' + cmtid).hide();
            }
        }
    });
    return false;
});

$(document).on('click', '.del_reply', function() {
    var repid = $(this).attr('data-reply');
    var cmtid = $(this).attr('data-cmt');

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 54,
            repid: repid,
            cmtid: cmtid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.reply_' + repid).hide();
            }
        }
    });
});

$(window).scroll(function() {

    var id = $('.myVideo').attr('data-postid');
    var vis = $(".myVideo").is(':visible');

});

//var id = $('.myVideo').attr('data-postid');

/* if($('.video'+id).is(':visible')){
    $('.video'+id).get(0).play();
}else{
    $('.video'+id).get(0).pause();  
}    */



$(window).scroll(function() {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        var div_count = $('.post-section').length;

        if (div_count >= 5) {
            var start = div_count;
            var end = div_count + 5;
            var limit = start + ',' + end;

            if ($('.append').hasClass('wallpost')) {
                $.ajax({
                    type: 'POST',
                    url: 'home/ajax-actions',
                    data: {
                        process: 55,
                        limit: limit
                    },
                    dataType: 'JSON',
                    success: function(res) {

                        $('.wallpost').append(res.result.html);
                    }
                });
                return false;
            }

            if ($('.append').hasClass('timelinepost')) {
                $.ajax({
                    type: 'POST',
                    url: 'home/ajax-actions',
                    data: {
                        process: 56,
                        limit: limit
                    },
                    dataType: 'JSON',
                    success: function(res) {

                        $('.timelinepost').append(res.result.html);
                    }
                });
                return false;
            }

            if ($('.append').hasClass('group_wallpost')) {
                $.ajax({
                    type: 'POST',
                    url: 'home/ajax-actions',
                    data: {
                        process: 75,
                        limit: limit
                    },
                    dataType: 'JSON',
                    success: function(res) {
                        $('.group_wallpost').append(res.result.html);
                    }
                });
                return false;
            }

            /* if(('.append').hasClass('videolist')){
                $.ajax({
                    type:'POST',
                    url:'home/ajax-actions',
                    data :{process:58, limit:limit},
                    dataType: 'JSON',
                    success: function(res){
                         console.log(res);
                        $('.videolist').append(res.result.html);
                    }
                });
                return false;
            } */

        }
    }
});


$(document).on('keyup', '#searchbox', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == 13) {
        search();
    }
});

$(document).on('click', '.search-button', function() {
    search();
});

function search(val) {
    var searchval = $('#searchbox').val();
    if (checkNotEmpty(searchval)) {
        location.href = "search?src=" + searchval;
    }
}


//--Chat Attachment--//


$(document).on('change', '.chtAtach', function() {
    var recid = ($(this).attr('data-rec'));
    $('#oldname' + recid).val('');

    var file = $('#chatAttachment' + recid).prop("files")[0];
    var imagename = file.name;
    var imagetype = file.type;

    var form_data = new FormData($('form#attachmentForm')[0]);
    form_data.append('file', file);
    form_data.append('process', 59);

    $.ajax({
        url: 'home/ajax-actions',
        method: 'POST',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            $('.loader' + recid).attr('style', 'display:block;');
            if (res.result.status == "success") {

                var anyWindow = window.URL || window.webkitURL;
                var objectUrl = anyWindow.createObjectURL(file);

                $('#chatUpload' + recid).val(res.result.filename);

                //$('#attachment').val(res.result.oldname);                 
                //$('#attachment').attr('style','display:block;');

                var oldname = '';
                filename = (res.result.oldname);
                if (filename.length > 13) {
                    var name = filename.substring(0, 10);
                    var ext = filename.slice(-4);
                    oldname = (name + ext);
                } else {
                    oldname = filename;
                }
                $('.attach-file-name' + recid).html(oldname);
                $('.chatUploadAttch' + recid).attr('style', 'display:block;');

                $('#oldname' + recid).val(oldname);

                //$('#chatUpload').val(objectUrl);

                setTimeout(function() {
                    $('.loader' + recid).fadeOut('slow');
                }, 3000);
            } else {
                $('.loader' + recid).attr('style', 'display:none;');
                alert(res.result.message);
            }
        }
    });
    return false;

});

$(document).on('click', '#send_msg', function() {
    $('.chatUploadAttch').attr('style', 'display:none;');
});


//----//.


$(window).scroll(function() {

    /* $('.myVideo').each(function(){
        if ($(this).is(":in-viewport")) {
            $(this)[0].play();
        } else {
            $(this)[0].pause();
        }
    }); */
    //var id =$('.postid:visible').attr('data-postid');
    //var id =$('.postid:visible').visible( false, true );  
    //alert(id);
});


/* $(window).scroll(function(){
    if ($('.postid').is(':visible')==true){
        var id = $('.postid').attr('data-postid');
        alert(id);
    }else{
        alert('false');
    } 
}); */


/* $(document).ready(function () {
    
var myVideo = document.getElementById('videopost');
    VisSense.VisMon.Builder(VisSense(myVideo, { fullyvisible: 0.75 }))
    .on('fullyvisible', function(monitor) {
      myVideo.play();
     alert('play');
    })
    .on('hidden', function(monitor) {
      myVideo.pause();
        alert('pause');
    })
    .build()
    .start();   
    
});*/


$(document).on('change', '#regImageUpload1', function(e) {

    var file = $(this).prop("files")[0];
    var form_data = new FormData($('form#regStep21')[0]);
    form_data.append('file', file);
    form_data.append('process', 65);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            $('.loader').attr('style', 'display:block;');
            if (res.result.status == 'success') {
                $('#regImg1').attr('src', 'images/users/' + res.result.fileName);
                setTimeout(function() {
                    $('.loader').fadeOut('slow');
                }, 3000);
            } else {
                $('.loader').attr('style', 'display:none;');
                alert(res.result.message);
            }
        }
    });

    return false;

});


$(document).on('change', '#regImageUpload2', function(e) {

    var file = $(this).prop("files")[0];
    var form_data = new FormData($('form#regStep22')[0]);
    form_data.append('file', file);
    form_data.append('process', 65);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            $('.loader').attr('style', 'display:block;');
            if (res.result.status == 'success') {
                $('#regImg2').attr('src', 'images/users/' + res.result.fileName);
                setTimeout(function() {
                    $('.loader').fadeOut('slow');
                }, 3000);
            } else {
                $('.loader').attr('style', 'display:none;');
                alert(res.result.message);
            }
        }
    });

    return false;

});



$(document).on('change', '#regImageUpload3', function(e) {

    var file = $(this).prop("files")[0];
    var form_data = new FormData($('form#regStep23')[0]);
    form_data.append('file', file);
    form_data.append('process', 65);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            $('.loader').attr('style', 'display:block;');
            if (res.result.status == 'success') {
                $('#regImg3').attr('src', 'images/users/' + res.result.fileName);
                setTimeout(function() {
                    $('.loader').fadeOut('slow');
                }, 3000);
            } else {
                $('.loader').attr('style', 'display:none;');
                alert(res.result.message);
            }
        }
    });
    return false;

});



$(document).on('click', '.reg_step21', function() {

    var authid = $(this).attr('data-authid');
    var form_data = new FormData($('form#regStep21')[0]);
    form_data.append('process', 62);

    var vorname = $('#vorname1').val();
    if (vorname == '') {
        $('#vorname1').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(res) {
                location.href = '/register3?auth_id=' + authid;
            }
        });
        return false;
    }
});



$(document).on('click', '.reg_step22', function() {

    var authid = $(this).attr('data-authid');
    var form_data = new FormData($('form#regStep22')[0]);
    form_data.append('process', 63);

    var vorname = $('#vorname2').val();
    if (vorname == '') {
        $('#vorname2').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(res) {
                location.href = '/register3?auth_id=' + authid;
            }
        });
        return false;
    }
});

$(document).on('click', '.reg_step23', function() {

    var authid = $(this).attr('data-authid');
    var form_data = new FormData($('form#regStep23')[0]);
    form_data.append('process', 64);

    var vorname = $('#vorname3').val();
    if (vorname == '') {
        $('#vorname3').closest('.form-group').find('.errorMsg').show();
    } else {

        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(res) {
                location.href = '/register3?auth_id=' + authid;
            }
        });
        return false;
    }
});


$(document).on('change', '#regImageUpload4', function(e) {


    var file = $(this).prop("files")[0];
    var form_data = new FormData($('form#regStep3')[0]);
    form_data.append('file', file);
    form_data.append('process', 66);


    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        success: function(res) {
            $('.loader').attr('style', 'display:block;');

            if (res.result.status == 'success') {
                $('#regImg4').attr('src', 'images/pets/' + res.result.fileName);
                $('#pet_pic').val(res.result.fileName);
                setTimeout(function() {
                    $('.loader').fadeOut('slow');
                }, 3000);
            } else {
                $('.loader').attr('style', 'display:none;');
                alert(res.result.message);
            }
        }
    });
    return false;

});

$(document).on('click', '.reg_step3', function() {
    var authid = $(this).attr('data-authid');
    var artid = $('#art_id').attr('data-artid');
    var rassenid = $('#rasse_id').attr('data-rassenid');
    var file = $('#petGallery').prop("files");

    var form_data = new FormData($('form#regStep3')[0]);
    form_data.append('petGallery', file);
    form_data.append('artid', artid);
    form_data.append('rassenid', rassenid);
    form_data.append('process', 67);

    var petname = $('#tiername').val();
    if (petname == '') {
        $('#tiername').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function(res) {
                location.href = '/register4?auth_id=' + authid;
            }
        });
        return false;
    }
});

$(document).on('click', '.cancel_job', function() {
    $('#addjobsPopup').modal('hide');
});

$(document).on('click', '.cancel_service', function() {
    $('#addservicePopup').modal('hide');
});

$(document).on('click', '.cancel_sell', function() {
    $('#tosellPopup').modal('hide');
});

$(document).on('click', '.sell_more_details', function() {
    var sale_id = event.target.id;
    if (sale_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 93,
                saleid: sale_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    var lists = res.result.salelist;
                    lists.forEach(function(list) {
                        var list = '<div> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><div class="row"><div class="col-lg-7 col-md-7 p-0"><div class="banner-slider "> <div class="item" style="background: url(../home/marktplatz/' + list.sell_image + ');"></div></div></div><div class="col-lg-5 col-md-5 p-0 mpRight"><div class="breadCrumb">Marktplatz <i class="fa fa-angle-right"></i> Kategorie   </div><h4>' + list.name + ' - ' + list.quantity + ' kg</h4><h5>' + list.city + ' <span class="right-date">' + list.created_date + '</span></h5><h3><span>CHF ' + list.price + '</span></h3><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque aliquam quo minus sunt animi suscipit quibusdam accusantium aliquid repellat officiis.</p><div class="mpMap"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d86456.59681321625!2d8.466674957306425!3d47.37743366890954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47900b9749bea219%3A0xe66e8df1e71fdc03!2sZ%C3%BCrich%2C+Switzerland!5e0!3m2!1sen!2sin!4v1554710083140!5m2!1sen!2sin" width="100%" height="100" frameborder="0" style="border:0" allowfullscreen></iframe></div><div class="">Verkäuferinfos</div><a href="javascript:;" class="btn btn-sm btn-gradient btn-border">Fragen Sie nach Details</a><div class="save-share"><ul><li><a class="saved_saleitems" id =' + list.id + ' href="javascript:;"><i class="fa fa-bookmark" aria-hidden="true"></i> Save</a></li></ul></div></div></div></div></div>';
                        $('#marketMorePopup .modal-body').html(list);
                        $('#marketMorePopup').modal('show');

                    });
                } else {
                    return false;
                }
            }
        });
        return false;
    }
});


$(document).on('click', '.saved_job', function(event) {
    var save_id = event.target.id;
    if (save_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 91,
                saveid: save_id
            },
            dataType: 'JSON',
            success: function(res) {

                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }

});

$(document).on('click', '.delete_myjob', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 101,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }

});

$(document).on('click', '.delete_myservice', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 108,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }

});

$(document).on('click', '.deactivate_job', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 102,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }
});


$(document).on('click', '.deactivate_service', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 109,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }
});



$(document).on('click', '.activate_job', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 103,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }
            }
        });
        return false;
    }
});

$(document).on('click', '.activate_service', function(event) {
    var d_id = event.target.id;
    if (d_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 110,
                deleteid: d_id
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }
            }
        });
        return false;
    }
});



$('.mail_publicIcon').click(function() {
    $('#view_mail_val').val('1');
    $('.mail_publicIcon').html('<img src="home/images/svg/eye1.svg">');
    $('.mail_publicIcon').addClass('yes');
});

$('a#view_mail.mail_publicIcon.yes').click(function() {
    $('#view_mail_val').val('0');
    $('.mail_publicIcon').html('<img src="home/images/svg/eye2.svg">');
    $('.mail_publicIcon').removeClass('yes');
});

$('.phone_publicIcon').click(function() {
    $('#view_phone_val').val('1');
    $('.phone_publicIcon').html('<img src="home/images/svg/eye1.svg">');
    $('.phone_publicIcon').addClass('yes');
});

$('a#view_phone.phone_publicIcon.yes').click(function() {
    $('#view_phone_val').val('0');
    $('.phone_publicIcon').html('<img src="home/images/svg/eye2.svg">');
    $('.phone_publicIcon').removeClass('yes');
});

$(document).on('click', '.saved_saleitems', function(event) {
    var save_id = event.target.id;
    if (save_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 94,
                saveid: save_id
            },
            dataType: 'JSON',
            success: function(res) {

                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }

});


$(document).on('click', '.unsaved_job', function(event) {
    var usave_id = event.target.id;
    if (usave_id != '') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            //data: $('form#Addjob').serialize()+'&process=90', 
            data: {
                process: 92,
                usaveid: usave_id
            },
            dataType: 'JSON',
            success: function(res) {

                if (res.result.status == 'success') {
                    window.location.reload();
                } else {
                    return false;
                }

            }
        });
        return false;
    }

});




/* /****** Create a job ****
$(document).on('click','.search-button',function(){
    
    var title = $('#beruf').val();
    var city = $('#arbeitsort').val();
    
    if (title !='' || city !='' ){
            $.ajax({
                url:'home/ajax-actions',    
                method: 'POST',
                //data: $('form#Addjob').serialize()+'&process=90', 
                data:{process:90,jtitle:title,jcity:city},
                dataType:'JSON',
                success : function(res){ 
                console.log(res);
                if (res.result.status=='success') {         
                                                
                    } else {
                        return false;
                    } 
                }
            });
            return false;
        
    }   
});
*/

$(document).on('click', '.search-button-jobs', function() {

    var filter = $('#beruf').val();
    var clasnname = $(".search-button-jobs").hasClass("hide");
    var clasnname2 = $('.search-button-job_close').hasClass('show');

    if (clasnname == false) {
        $('.search-button-jobs').addClass('hide');
    } else {
        $('.search-button-jobs').removeClass('hide');
    }

    if (clasnname2 == false) {
        $('.search-button-job_close').addClass('show');
        document.getElementById("beruf").disabled = true;
    } else {
        $('.search-button-job_close').removeClass('show');
        document.getElementById("beruf").disabled = false;
    }

    var url = window.location.pathname;
    var urlsplit = url.split("/").slice(-1)[0];
    if (urlsplit == 'jobs') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                filtervalue: filter,
                process: 104
            },
            success: function(res) {
                var lists = res.result.result.joblist;

                $('#jobList').html('');
                if (checkNotEmpty(lists)) {
                    lists.forEach(function(job) {
                        var input = '';
                        var category = '';
                        var employment_type = '';

                        if (job.deactivate != 1) {
                            input = '<h5 class="mt-0 mb-1"><a href="job-detail?jobId=' + job.id + '"> ' + job.title + '</a></h5>';
                        } else {
                            input = '<h5 class="mt-0 mb-1"><a href="javascript:;">' + job.title + '</a></h5>';
                        }

                        if (job.category) {
                            category = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.category + '</span></span>';
                        }

                        if (job.employment_type) {
                            employment_type = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.employment_type + '</span></span>';
                        }
                        var des = job.description;
                        var list = '<li class="media"><img class="align-self-top job-poster mr-3" src="home/jobs/' + job.profile + '" alt="job-image"><div class="media-body">' +
                            input + '<a class="company-link" href=""><span class="highlight">' + job.company + '</span></a> - <span class="highlight">' + job.city + '</span><p>' + des.substr(0, 200) + ' ....</p><div class="badge-pool"><span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.created_date + '</span></span>' + category + ' ' + employment_type + '</div>   </div> <div class="vefified"><a data-toggle="tooltip" data-placement="top" title="Angesehen von"  class="view_count_job" data-view-id=' + job.id + ' href="javascript:;"><img src="home/images/svg/eye.svg"></a><a data-toggle="tooltip" data-placement="top" title="Speichern" href="javascript:;" class="saved_job" href="javascript:;"><img id=' + job.id + ' class="saved_job" src="home/images/svg/save-job.svg"></a></div></div></li>';
                        $('#jobList').append(list);
                        $('.job-list nav').css("display", "none");
                    });
                } else {
                    $('#jobList').append('<li style="text-align:center">Keine Stellenangebote.</li>');
                    $('.job-list nav').css("display", "none");
                }


            }
        });
    } else if (urlsplit == 'my-jobs') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                filtervalue: filter,
                process: 105
            },
            success: function(res) {
                var lists = res.result.result.joblist;

                $('#jobList').html('');
                if (checkNotEmpty(lists)) {
                    lists.forEach(function(job) {
                        var input = '';
                        var category = '';
                        var employment_type = '';
                        var deactivate = '';

                        if (job.deactivate != 1) {
                            input = '<h5 class="mt-0 mb-1"><a href="job-detail?jobId=' + job.id + '"> ' + job.title + '</a></h5>';
                            deactivate = '<a data-toggle="tooltip"  data-placement="top" title="Deaktivieren" id="deactivate_job" href="javascript:;" class="" href="javascript:;"><img class="deactivate_job" id=' + job.id + '   src="home/images/svg/deactivate-green.svg"></a>';
                        } else {
                            input = '<h5 class="mt-0 mb-1"><a href="javascript:;">' + job.title + '</a></h5>';
                            deactivate = '<a data-toggle="tooltip"  data-placement="top" title="Aktivieren" id="deactivate_job" href="javascript:;" class="" href="javascript:;"><img class="activate_job" id=' + job.id + '   src="home/images/svg/activate-green.svg"></a>';
                        }

                        if (job.category) {
                            category = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.category + '</span></span>';
                        }

                        if (job.employment_type) {
                            employment_type = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.employment_type + '</span></span>';
                        }
                        var des = job.description;
                        var list = '<li class="media"><img class="align-self-top job-poster mr-3" src="home/jobs/' + job.profile + '" alt="job-image"><div class="media-body">' +
                            input + '<a class="company-link" href=""><span class="highlight">' + job.company + '</span></a> - <span class="highlight">' + job.city + '</span><p>' + des.substr(0, 200) + ' ....</p><div class="badge-pool"><span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.created_date + '</span></span>' + category + ' ' + employment_type + '</div>   </div> <div class="vefified"><a data-toggle="tooltip" data-placement="top" title="Angesehen von"  class="view_count_job" data-view-id=' + job.id + ' href="javascript:;"><img src="home/images/svg/eye.svg"></a><a data-toggle="tooltip" data-placement="top" title="Speichern" href="javascript:;" class="saved_job" href="javascript:;"><img id=' + job.id + ' class="saved_job" src="home/images/svg/save-job.svg"></a></div><div class="my-job-settings"><a data-toggle="tooltip" data-target="#EditjobsPopup" data-placement="top" title="Bearbeiten"  class="" data-view-id="" href="job-edit?jobId=' + job.id + '"><img  src="home/images/svg/edit-green.svg"></a>' + deactivate + '<a data-toggle="tooltip" data-placement="top" title="Löschen" href="javascript:;"  href="javascript:;"><img  id=' + job.id + ' class="delete_myjob" src="home/images/svg/delete-green.svg"> </a></div> </div></li>';
                        $('#jobList').append(list);
                        $('.job-list nav').css("display", "none");
                    });
                } else {
                    $('#jobList').append('<li style="text-align:center">Keine Stellenangebote.</li>');
                    $('.job-list nav').css("display", "none");
                }
            }
        });
    } else if (urlsplit == 'savedjobs') {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                filtervalue: filter,
                process: 106
            },
            success: function(res) {
                var lists = res.result.result.joblist;

                $('#jobList').html('');
                if (checkNotEmpty(lists)) {
                    lists.forEach(function(job) {
                        var input = '';
                        var category = '';
                        var employment_type = '';

                        if (job.deactivate != 1) {
                            input = '<h5 class="mt-0 mb-1"><a href="job-detail?jobId=' + job.id + '"> ' + job.title + '</a></h5>';
                        } else {
                            input = '<h5 class="mt-0 mb-1"><a href="javascript:;">' + job.title + '</a></h5>';
                        }

                        if (job.category) {
                            category = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.category + '</span></span>';
                        }

                        if (job.employment_type) {
                            employment_type = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.employment_type + '</span></span>';
                        }
                        var des = job.description;
                        var list = '<li class="media"><img class="align-self-top job-poster mr-3" src="home/jobs/' + job.profile + '" alt="job-image"><div class="media-body">' +
                            input + '<a class="company-link" href=""><span class="highlight">' + job.company + '</span></a> - <span class="highlight">' + job.city + '</span><p>' + des.substr(0, 200) + ' ....</p><div class="badge-pool"><span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.created_date + '</span></span>' + category + ' ' + employment_type + '</div>   </div> <div class="vefified"><a data-toggle="tooltip" data-placement="top" title="entfernen" href="javascript:;" class="" href="javascript:;"><img id=' + job.id + ' class="unsaved_job" src="home/images/svg/entferen.svg">    </a><a data-toggle="tooltip" data-placement="top" title="Angesehen von"  class="view_count_job" data-view-id=' + job.id + ' href="javascript:;"><img src="home/images/svg/eye.svg"></a></div></div></li>';
                        $('#jobList').append(list);
                        $('.job-list nav').css("display", "none");
                    });
                } else {
                    $('#jobList').append('<li style="text-align:center">Keine Stellenangebote.</li>');
                    $('.job-list nav').css("display", "none");
                }


            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                filtervalue: filter,
                process: 107
            },
            success: function(res) {
                var lists = res.result.result.joblist;

                $('#jobList').html('');
                if (checkNotEmpty(lists)) {
                    lists.forEach(function(job) {
                        var input = '';
                        var category = '';
                        var employment_type = '';

                        if (job.deactivate != 1) {
                            input = '<h5 class="mt-0 mb-1"><a href="job-detail?jobId=' + job.id + '"> ' + job.title + '</a></h5>';
                        } else {
                            input = '<h5 class="mt-0 mb-1"><a href="javascript:;">' + job.title + '</a></h5>';
                        }

                        if (job.category) {
                            category = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.category + '</span></span>';
                        }

                        if (job.employment_type) {
                            employment_type = '<span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.employment_type + '</span></span>';
                        }
                        var des = job.description;
                        var list = '<li class="media"><img class="align-self-top job-poster mr-3" src="home/jobs/' + job.profile + '" alt="job-image"><div class="media-body">' +
                            input + '<a class="company-link" href=""><span class="highlight">' + job.company + '</span></a> - <span class="highlight">' + job.city + '</span><p>' + des.substr(0, 200) + ' ....</p><div class="badge-pool"><span data-badge="outline" class="badge badge-prevent-overflow outline"><span>' + job.created_date + '</span></span>' + category + ' ' + employment_type + '</div>   </div> <div class="vefified"><a data-toggle="tooltip" data-placement="top" title="Angesehen von"  class="view_count_job" data-view-id=' + job.id + ' href="javascript:;"><img src="home/images/svg/eye.svg"></a><a data-toggle="tooltip" data-placement="top" title="Speichern" href="javascript:;" class="saved_job" href="javascript:;"><img id=' + job.id + ' class="saved_job" src="home/images/svg/save-job.svg"></a></div></div></li>';
                        $('#jobList').append(list);
                        $('.job-list nav').css("display", "none");
                    });
                } else {
                    $('#jobList').append('<li style="text-align:center">Keine Stellenangebote.</li>');
                    $('.job-list nav').css("display", "none");
                }


            }
        });
    }
    return false;
});

$(document).on('click', '.search-button-job_close.show', function() {
    var filter = $('#beruf').val('');
    $('.search-button-jobs').trigger('click');
});

$(document).on('click', '.view_counts', function() {
    var serviceid = $(this).attr('data-view-id');
    if (checkNotEmpty(serviceid)) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                sid: serviceid,
                process: 96
            },
            success: function(res) {
                if (res.result.status == 'success') {

                } else {
                    return false;
                }
            }
        });
        return false;
    }
});

$(document).on('click', '.view_count_jobs', function() {
    var jobid = $(this).attr('data-view-id');
    if (checkNotEmpty(jobid)) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                jid: jobid,
                process: 99
            },
            success: function(res) {
                if (res.result.status == 'success') {

                } else {
                    return false;
                }
            }
        });
        return false;
    }
});

$(document).on('click', '.likes_count', function() {
    var serviceid = $(this).attr('data-like-id');
    if (checkNotEmpty(serviceid)) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                sid: serviceid,
                process: 97
            },
            success: function(res) {
                if (res.result.status == 'success') {

                } else {
                    return false;
                }
            }
        });
        return false;
    }
});


$(document).on('click', '.service_search_button', function() {
    var input, filter, ul, li, a, i, txtValue, nameCapitalized;
    var filter = $('#beruf_services').val();
    var nameCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);

    ul = document.getElementById("service_provider");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(nameCapitalized) > -1) {
            li[i].style.display = "";
            $('.service_search_button').addClass('hide');
            $('.service_search_button_close').addClass('show');
            document.getElementById("beruf_services").disabled = true;
        } else {
            li[i].style.display = "none";
            $('.service_search_button').addClass('hide');
            $('.service_search_button_close').addClass('show');
            document.getElementById("beruf_services").disabled = true;
        }
    }
});

$(document).on('click', '.service_search_button_close.show', function() {
    var input, filter, ul, li, a, i, txtValue, nameCapitalized;
    var filter = $('#beruf_services').val('');
    //var nameCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);

    ul = document.getElementById("service_provider");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(filter) > -1) {
            $('.service_search_button').removeClass('hide');
            $('.service_search_button_close').removeClass('show');
            document.getElementById("beruf_services").disabled = false;
        } else {
            li[i].style.display = "";
            $('.service_search_button').removeClass('hide');
            $('.service_search_button_close').removeClass('show');
            document.getElementById("beruf_services").disabled = false;
        }
    }
});

/*$(document).on('click', '.animals_search_button', function() {
    var input, filter, ul, li, a, i, txtValue, nameCapitalized;
    var filter = $('#beruf_animals').val();
    var nameCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);
    ul = document.getElementById("animalsList");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(nameCapitalized) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});*/

$(document).on('click', '.animals_search_button', function() {
    var filter = $('#beruf_animals').val();
    var clasnname = $(".animals_search_button").hasClass("hide");
    var clasnname2 = $('.search-button-animal-close').hasClass('show');
    if (clasnname == false) {
        $('.animals_search_button').addClass('hide');
    } else {
        $('.animals_search_button').removeClass('hide');
    }

    if (clasnname2 == false) {
        $('.search-button-animal-close').addClass('show');
        document.getElementById("beruf_animals").disabled = true;
    } else {
        $('.search-button-animal-close').removeClass('show');
        document.getElementById("beruf_animals").disabled = false;
    }

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            filtervalue: filter,
            process: 124
        },
        success: function(res) {
            var lists = res.result.result.animallist;
            console.log(lists);
            $('#animalsList').html('');
            if (checkNotEmpty(lists)) {
                lists.forEach(function(animal) {
                    var list = '<li class="col-lg-4 col-md-6 mb-3"> <div class="card"><div class="card-body"><div class="product-content"><a href="vermisste-tiere-detail?animalId=' + animal.id + '" class="btn btn-sm btn-gradient btn-border">Siehe Einzelheiten</a> </div><img class="img-fluid" src="home/images/' + animal.photo + '" alt=""><div class="mprice"><span>' + animal.gender + '</span></div></div><div class="card-footer"><p>' + animal.name + '</p><div class="sm-footer"><h3>Farbe(n) : ' + animal.color + '</h3></div></div></div></li>';
                    $('#animalsList').append(list);
                });
            } else {
                $('#animalsList').append('<li style="text-align: center;    width: 100%;    font-size: 20px;    padding: 20px;">Keine fehlenden Tiere.</li>');

            }


        }
    });

});

$(document).on('click', '.search-button-animal-close.show', function() {
    var filter = $('#beruf_animals').val('');
    $('.animals_search_button').trigger('click');
});




$(document).on('keyup', '#searchbox', function(e) {
    var input, filters, ul, li, a, i, txtValue, nameCapitalized;
    var filters = $('.mpFilter #searchbox').val();
    var nameCapitalized = filters.charAt(0).toUpperCase() + filter.slice(1);
    ul = document.getElementById("sale_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("p")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(nameCapitalized) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

});

$('#select-country-service').change(function() {
    var input, filter, ul, li, a, i, txtValue, nameCapitalized;
    var filter = $(this).val();
    var nameCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);
    ul = document.getElementById("service_provider");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(nameCapitalized) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

});

$('#select-category-service').change(function() {
    var input, filter, ul, li, a, i, txtValue, nameCapitalized;
    var filter = $(this).val();
    console.log(filter);
    var nameCapitalized = filter.charAt(0).toUpperCase() + filter.slice(1);
    ul = document.getElementById("service_provider");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }

});


$('.kateList ul li > a').click(function() {
    $('.kateList ul li').removeClass();
    $(this).parent().addClass('active');
    var input, filters, ul, li, a, i, txtValue;
    var filters = $(".kateList ul li.active a").text();
    ul = document.getElementById("sale_list");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h3")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.indexOf(filters.toLowerCase()) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
});

$('.market-sub-menu li > a').click(function() {
    $('.market-sub-menu ul li').removeClass();
    $(this).parent().addClass('active');

});

$(document).ready(function() {
    var url = window.location.pathname;
    var urlsplit = url.split("/").slice(-1)[0];

    if (urlsplit == 'marktplatz') {
        $('.market-sub-menu ul li:nth-child(1)').addClass('active');
    }
    if (urlsplit == 'mypurchase-marketplace') {
        $('.market-sub-menu ul li:nth-child(2)').addClass('active');
    }
    if (urlsplit == 'saveditems-marketplace') {
        $('.market-sub-menu ul li:nth-child(3)').addClass('active');
    }
});

$(document).ready(function() {
    var url = window.location.pathname;
    var urlsplit = url.split("/").slice(-1)[0];
    if (urlsplit == 'job-history') {
        $('.job-sub-menu ul li:nth-child(1)').addClass('active');
    }
    if (urlsplit == 'savedjobs') {
        $('.job-sub-menu ul li:nth-child(2)').addClass('active');
    }
});



$(document).on('keyup', '#select-art', function() {

    $('#select-rasse').val('');
    $('#rasse_id').val('');

    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.art_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 68,
                art: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="artlist" data-id="' + listing[index].id + '" data-artname="' + listing[index].art + '" >' + listing[index].art + '</li>';
                        $('.art_list').append(list);
                    });
                } else {
                    $('.art_list').html('');
                }
            }

        });
        return false;
    } else {

        $('.art_list').html('');

        $('.art_list').html('<li class="artlist" data-id="3" data-artname="Alpakas"> Alpakas </li><li class="artlist" data-id="4" data-artname="Bison"> Bison </li> <li class="artlist" data-id="5" data-artname="Esel"> Esel    </li> <li class="artlist" data-id="9" data-artname="Hirsch"> Hirsch    </li> <li class="artlist" data-id="1" data-artname="Hunde"> Hunde </li> <li class="artlist" data-id="2" data-artname="Katzen"> Katzen   </li> <li class="artlist" data-id="6" data-artname="Lamas"> Lamas </li> <li class="artlist" data-id="7" data-artname="Pferde"> Pferde   </li> <li class="artlist" data-id="8" data-artname="Rehe"> Rehe  </li> <li class="artlist" data-id="10" data-artname="Rinder">  Rinder  </li> <li class="artlist" data-id="11" data-artname="Schafe">   Schafe  </li> <li class="artlist" data-id="12" data-artname="Ziegen">   Ziegen  </li>');

        $('#art_id').val('');
        $('#chipnummer').attr('style', 'display:none;');
    }


});

$(document).on('click', '.artlist', function() {
    $('.rassen_list').html('');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-artname');

    $('#select-art').val(name);
    $('#art_id').val(id);
    $('#art_id').attr('data-artid', id);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            artid: id,
            process: 69
        },
        success: function(res) {
            var listing = res.result.list;
            if (checkNotEmpty(listing)) {
                $.each(listing, function(index, value) {
                    var list = '<li class="rassenlist" data-id="' + listing[index].id + '" data-artid="' + listing[index].art_id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                    $('.rassen_list').append(list);
                });
            } else {
                $('.rassen_list').html('');
            }
        }
    });
    return false;
});


$(document).on('keyup', '#select-rasse', function() {
    $('#rasse_id').val('');

    var artid = $('#art_id').val();
    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.rassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 77,
                artid: artid,
                rassen: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="raslist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.rassen_list').append(list);
                    });
                } else {
                    $('.rassen_list').html('');
                }
            }
        });
        return false;
    } else {
        $('.rassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 78,
                artid: artid
            },
            success: function(res) {
                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="raslist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.rassen_list').append(list);
                    });
                }
            }
        });
        return false;
    }


});


$(document).on('click', '.rassenlist, .raslist', function() {
    var ras_id = $(this).attr('data-id');
    var ras_name = $(this).attr('data-rasname');

    $('#select-rasse').val(ras_name);
    $('#rasse_id').val(ras_id);
    $('#rasse_id').attr('data-rassenid', ras_id);
});

$(document).on('click', '.artlist', function() {
    $('#select-rasse').val('');
    $('#rasse_id').val('');
    $('#art-list').attr('style', 'display:none;');
    $('#chipnummer').attr('style', 'display:block;');
});


$('.registration4').on('click', function() {
    var logtype = $(this).attr('data-logtype');
    var email = $(this).attr('data-email');
    if (logtype == 2) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 70,
                email: email
            },
            success: function(res) {
                if (res.result.status == "success") {
                    alertify.alert('Registrierungsschritte abgeschlossen. Login-ID und Passwort an Ihre Mail-ID gesendet.', function() {
                        location.href = "/";
                    });
                }
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 100,
                email: email
            },
            success: function(res) {
                if (res.result.status == "success") {
                    location.href = "timeline";
                }
            }
        });

    }

});

$(document).on('change', '.art_type', function() {
    var artid = ($(this).val());

    if (checkNotEmpty(artid)) {
        $('.rasse_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 69,
                artid: artid
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<option  value="' + listing[index].id + '" > ' + listing[index].rassen + '</option>';
                        $('.rasse_list').append(list);

                    });
                } else {
                    //$('.art_list').html(''); 
                }
            }

        });
        return false;
    }
});



$(document).on('click', '#geburts1, #geburts2, #geburts3', function() {

    $(this).datepicker().datepicker("show");

    $(this).datepicker({
        format: "dd.mm.yyyy"
    });


});


$(document).on('click', '#geburtsjahr, #edit_geburtsjahr', function() {

    $(this).datepicker({
        format: "yyyy",
        viewMode: "years",
        minViewMode: "years",
        endDate: '+0y'
    });
    $(this).datepicker("show");
});


$(document).on('change', '#geburtsjahr', function() {
    var year = $(this).val();
    if (year) {
        var current = (new Date()).getFullYear();
        var age = current - year;
        $('#altar').val(age);
        $('#age').val(age);

    }
});


$(document).on('change', '#edit_geburtsjahr', function() {
    var year = $(this).val();
    if (year) {
        var current = (new Date()).getFullYear();
        var age = current - year;
        $('#edit_age').val(age);
    }
});

$(document).on('click', '.createGroup', function() {
    var formdata = new FormData($('form#groupform')[0]);
    formdata.append('process', 71);
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: formdata,
        success: function(res) {
            console.log(res);
            if (res) {
                location.href = "/grouplist";
            }
        }
    });
});

$(document).on('click', '.editGroup', function() {
    var groupid = $(this).attr('data-groupid');
    var formdata = new FormData($('form#groupform')[0]);
    formdata.append('groupid', groupid);
    formdata.append('process', 83);
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        cache: false,
        contentType: false,
        processData: false,
        data: formdata,
        success: function(res) {
            if (res) {
                location.href = "/grouplist";
            }
        }
    });
});

$(document).on('click', '.crop_save1', function() {
    var img = $('.crop_save1').attr('data-cropped');
    var groupid = $('.crop_save1').attr('data-groupid');
    //console.log(img);

    setTimeout(function() {
        var img = $('.crop_save1').attr('data-cropped');
        //console.log(img);
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            data: {
                process: 72,
                img: img,
                groupid: groupid
            },
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == "success") {
                    location.reload();
                }
            }
        });
    }, 1000);

});


//Group Member drop down//

$(document).on('keyup', '.default', function() {
    var keyval = $(this).val();
    console.log(keyval);
    if (checkNotEmpty(keyval)) {
        if (keyval != 'Wähle Mitgliede') {
            $('.chosen-results.memberslist').html('');
            $.ajax({
                type: 'POST',
                url: 'home/ajax-actions',
                dataType: 'JSON',
                data: {
                    process: 73,
                    keyval: keyval
                },
                success: function(res) {
                    var listing = res.result.list;
                    console.log(listing);
                    if (checkNotEmpty(listing)) {
                        $.each(listing, function(index, value) {
                            var list = '<li class="active-result" data-username="' + listing[index].username + '" data-userid="' + listing[index].id + '" data-option-array-index="0" style="">' + listing[index].username + '</li>';
                            $('.chosen-results.memberslist').append(list);
                        });

                    }
                }
            });
            return false;
        }
    }
});

// --//

/* $(document).on('click','.active-result',function(){
    alert('test new');
var userid = $(this).attr('data-userid');
var username = $(this).attr('data-username');
alert(userid);

    var selected = '<li class="search-choice" ><span>"'+username+'"</span><a class="search-choice-close" data-option-array-index="0"></a></li>';
    
    $('.chosen-choices').append(selected);
    
});

 */


$(document).on('keypress', '#group_posttxt', function() {
    return false;
});

$(document).on('click', '#group_posttxt', function() {
    $('#about').focus();
    $('form#groupPost')[0].reset();
});

$(document).on('change', '#postImageGroup', function() {
    $('.groupPost_publish').show();
    var fileList = this.files;

    var anyWindow = window.URL || window.webkitURL;

    for (var i = 0; i < fileList.length; i++) {
        var objectUrl = anyWindow.createObjectURL(fileList[i]);

        var preview = '<li class="multi_img"><div class="action-btn remove_prvimg"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + objectUrl + '" alt="" width="175" height="198"></li>';

        $('.img_preview').show();
        $('.post_imgpreview').append(preview);

        window.URL.revokeObjectURL(fileList[i]);
    }
});

$(document).on('click', '.groupPost_publish', function() {

    var file = $('#postImageGroup').prop("files");
    var video = $('#postVideoGroup').prop("files");
    var about = $('#groupAbout').val();

    var form_data = new FormData($('form#groupPost')[0]);
    form_data.append('postImageGroup', file);
    form_data.append('postVideoGroup', video);
    form_data.append('process', 74);
    var gid = $('#groupID').val();
    $('.uploadProgressbar').hide();

    if (checkNotEmpty(about) || (file.length != 0) || (video.length != 0)) {
        $('.uploadProgressbar').show();
        var someimage = document.getElementById('ogimage');
        var myimg = someimage.getElementsByTagName('img')[0];

        if (myimg != undefined) {
            console.log('test1');
            var mysrc = myimg.src;
            var imgname = mysrc.split("/").slice(-1)[0];
            var description = document.getElementById("mdescription").innerHTML;
            var title = document.getElementById("mtitle").innerHTML;
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    about: about,
                    description: description,
                    title: title,
                    url: mysrc,
                    imgname: imgname,
                    gid: gid,
                    process: 114
                },
                cache: false,
                success: function(res) {
                    console.log(res);
                    if (res.result.status == "success") {
                        $('.uploadProgressbar').hide();
                        window.location.reload();
                    }
                }
            });
        } else {

            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: form_data,
                cache: false,
                contentType: false,
                processData: false,
                success: function(res) {

                    if (res.result.status == "success") {

                        $('.uploadProgressbar').hide();
                        location.reload();
                    }
                }
            });
        }
        return false;

    } else {
        alertify.alert('Schreiben Sie über Ihr Haustier, um es zu veröffentlichen');
    }
});

$(document).on('click', '.clsPostPopUp', function() {
    //$('form#groupPost')[0].reset();
});

$(document).on('keypress', '#groupAbout', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);

    if (keycode == '13') {
        return false;
    }

});

$(document).on('click', '#group_posttxt', function() {
    $('#groupAbout').focus();
});
$(document).on('keyup', '#groupAbout', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var abt = $('#groupAbout').val();
    var imagee = $('#postImageGroup').val();
    var video = $('#postVideoGroup').val();

    if (checkNotEmpty(abt) || checkNotEmpty(imagee) || checkNotEmpty(video)) {

        if (checkNotEmpty(abt)) {
            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                data: {
                    process: 111,
                    url: abt
                },
                success: function(res) {
                    if (res.result.status == "success") {
                        if (checkNotEmpty(res.result.data.image.url)) {
                            $('.ogimage').html('<div><image src=' + res.result.data.image.url + ' alt="image" /><h4 id="mtitle">' + res.result.data.title + '</h4><p id="mdescription">' + res.result.data.description + '</p></div>');
                            $('.ogimage_block').addClass('none');
                        } else {
                            $('.ogimage_block').removeClass('none');
                            return false;
                        }
                    }
                    return false;
                }
            });
        }
        $('.groupPost_publish').show();
    } else {
        $('.ogimage_block').removeClass('none');
        $('.groupPost_publish').hide();
        $('.ogimage').html('');
    }



    if (keycode == 8 || keycode == 46) {
        if (checkNotEmpty(abt)) {
            $('.groupPost_publish').show();
        } else {
            $('.groupPost_publish').hide();
        }
    }
});


/* 
$(document).on('keyup','#enter_groupcmt',function(event){
var keycode = (event.keyCode ? event.keyCode : event.which);
 
    if(keycode==13){  
        $( ".post_comments" ).trigger( "click" );
    }
});
 */


$(document).on('change', '#postVideoGroup', function() {
    $('.groupPost_publish').show();
    var fileList = event.target.files[0];
    var fileReader = new FileReader();
    fileReader.onload = function() {
        var blob = new Blob([fileReader.result], {
            type: fileList.type
        });
        var url = URL.createObjectURL(blob);
        var video = document.createElement('video');
        var timeupdate = function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
                video.pause();
            }
        };
        video.addEventListener('loadeddata', function() {
            if (snapImage()) {
                video.removeEventListener('timeupdate', timeupdate);
            }
        });
        var snapImage = function() {
            var canvas = document.createElement('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            var image = canvas.toDataURL();
            var success = image.length > 100000;
            if (success) {
                var img = document.createElement('img');

                var thumb = '<li class="multi_img"><div class="action-btn remove_prvgrp_video"><a href="javascript:;" title="Delete"><i class="fa fa-times" aria-hidden="true"></i></a></div><img src="' + image + '" alt="" width="75" height="75"></li>';
                $('.grp_vidpreview').append(thumb);
                $('.vid_preview').attr('style', 'display:block;');
                URL.revokeObjectURL(url);

            }
            return success;
        };
        video.addEventListener('timeupdate', timeupdate);
        video.preload = 'metadata';
        video.src = url;
        video.muted = true;
        video.playsInline = true;
        video.play();
    };

    fileReader.readAsArrayBuffer(fileList);

});


$(document).on('keyup', '.submit_groupcmt', function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    var comments = $(this).val();
    var imagee = $('#commentImage').val();

    if (keycode == '13') {
        if (checkNotEmpty(comments) || checkNotEmpty(imagee)) {

            var post_id = $(this).attr('data-postid');
            var posted_by = $(this).attr('data-createdby');
            var commented_by = $(this).attr('data-commented-user');

            $.ajax({
                url: 'home/ajax-actions',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    post_id: post_id,
                    posted_by: posted_by,
                    commented_by: commented_by,
                    comments: comments,
                    imagee: imagee,
                    process: 21
                },
                cache: false,
                success: function(res) {

                    if (res.result.status == "success") {
                        var profilepic = res.result.user.profile_pic;
                        var petpic = res.result.user.pet_profile_pic;
                        var username = res.result.user.username;
                        var userid = res.result.user.id;
                        var comment_info = res.result.comment;
                        var comment_id = comment_info.id;

                        var cmt = '';
                        cmt = '<div class="form-row cmnt_' + comment_id + '"><div class="col-lg-2 col-md-3 col-sm-2 col-3  my-auto p-0"><div class="media profile-double"><div class="profile-group-md"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/users/' + ((profilepic) ? (profilepic) : ('dummy_user.jpg')) + '"></div></div><div class="media-body pl-2"><div class="profile-img border-rounded"><img class="rounded-circle" src="images/pets/' + ((petpic) ? (petpic) : ('dummy_pet.jpg')) + '"></div></div></div></div><div class="col-lg-10 col-md-6 col-sm-7 col-6 my-auto p-0"><div class="first-comment"><span>' + username + '</span>' + comments;

                        if (imagee) { //available image comment displayed  
                            cmt += '<p><a data-fancybox="" href="images/comment_images/' + imagee + '"><img src="images/comment_images/' + imagee + '" height="80"></a></p>';

                        }

                        cmt += '</div><div class="comment-settings"><div class="dropdown"><a class="dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-v" aria-hidden="true"></i> </a> <div class="dropdown-menu box-shadow" aria-labelledby="dropdownMenuButton"> <a class="dropdown-item hide_cmnt hide_cmnt' + comment_id + '" href="javascript:;" data-cmt="' + comment_id + '" >Hide Kommentieren</a> <a class="dropdown-item del_cmnt del_cmnt' + comment_id + ' " href="javascript:;" data-cmt="' + comment_id + '"  data-postid="' + post_id + '">Delete Kommentieren</a> </div></div></div></div> <div class="col-lg-12 my-auto p-0">  ';

                        /* var aDate = res.result.comment.created_date;
                        
                        var day = aDate.getDate();
                        var month = aDate.getMonth()+1; 
                        var year = aDate.getFullYear();
                        var recDate = day+'-'+month+'-'+year;

                        var today = new Date(); 
                        var t_day = today.getDate();
                        var t_month = today.getMonth()+1;  
                        var t_year = today.getFullYear();
                        var curDate=t_day+'-'+t_month+'-'+t_year;
                        var yesDate = (t_day-1)+'-'+t_month+'-'+t_year; 
                        var yesDateBefore = (t_day-2)+'-'+t_month+'-'+t_year; 
                        
                        var dateString='';
                        if(recDate==curDate) dateString='Heute';
                        else if(recDate==yesDate) dateString='Gestern';
                        else if(recDate==yesDateBefore) dateString='Vorgestern ';
                        else dateString= aDate.toDateString().split(' ').slice(1).join(' ');  */

                        cmt += '</div></div>';


                        $('.recent_comment' + post_id).append(cmt);
                        $('.submit_comment').val('');
                        $('#commentImage').val('');
                        $('.upload-images-list').hide();
                        //location.reload();
                    }
                }
            });

            return false;
        }
    }
});

$(document).on('click', '.delete_grouppost', function() {
    var postid = $(this).attr('data-postid');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 75,
            postid: postid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.grouppost' + postid).hide();
            }
        }
    });
    return false;
});


$(document).on('click', '.deleteGroup', function() {
    var groupid = $(this).attr('data-groupid');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 76,
            groupid: groupid
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $('.grouplist' + groupid).hide();
            }
        }
    });
    return false;
});


$(document).on('click', '.groupwall', function() {
    var wallid = $(this).attr('data-wallid');
    location.href = '/groupwall?id=' + wallid;
});


$(document).on('change', '.add_arttype', function() {
    var artid = ($(this).val());

    if (checkNotEmpty(artid)) {
        $('.add_rassentype').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 69,
                artid: artid
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<option value="' + listing[index].id + '" > ' + listing[index].rassen + '</option>';
                        $('.add_rassentype').append(list);

                    });
                } else {
                    //$('.art_list').html(''); 
                }
            }

        });
        return false;
    }
});


$(document).on('keyup', '#select-art', function() {

    $('#select-rasse').val('');
    $('#rasse_id').val('');

    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.edit_artlist').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 68,
                art: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="edit_art" data-id="' + listing[index].id + '" data-artname="' + listing[index].art + '" >' + listing[index].art + '</li>';
                        $('.edit_artlist').append(list);
                    });
                } else {
                    $('.edit_artlist').html('');
                }
            }

        });
        return false;
    } else {

        $('.edit_artlist').html('');

        $('.edit_artlist').html('<li class="edit_art" data-id="3" data-artname="Alpakas"> Alpakas </li><li class="edit_art" data-id="4" data-artname="Bison"> Bison </li> <li class="edit_art" data-id="5" data-artname="Esel"> Esel     </li> <li class="edit_art" data-id="9" data-artname="Hirsch"> Hirsch   </li> <li class="edit_art" data-id="1" data-artname="Hunde"> Hunde </li> <li class="edit_art" data-id="2" data-artname="Katzen"> Katzen </li> <li class="edit_art" data-id="6" data-artname="Lamas"> Lamas </li> <li class="edit_art" data-id="7" data-artname="Pferde"> Pferde </li> <li class="edit_art" data-id="8" data-artname="Rehe"> Rehe     </li> <li class="edit_art" data-id="10" data-artname="Rinder"> Rinder  </li> <li class="edit_art" data-id="11" data-artname="Schafe">  Schafe  </li> <li class="edit_art" data-id="12" data-artname="Ziegen">  Ziegen  </li>');

        $('#art_id').val('');
    }


});


$(document).on('click', '.edit_art', function() {
    $('.editrassen_list').html('');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-artname');

    $('#select-art').val(name);
    $('#editart_id').val(id);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            artid: id,
            process: 69
        },
        success: function(res) {
            var listing = res.result.list;
            if (checkNotEmpty(listing)) {
                $.each(listing, function(index, value) {
                    var list = '<li class="edit_rassenlist" data-id="' + listing[index].id + '" data-artid="' + listing[index].art_id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                    $('.editrassen_list').append(list);

                });
                $('#rasse-list').attr('style', 'display:block;');
            } else {
                $('.editrassen_list').html('');
            }
        }
    });
    return false;
});


$(document).on('click', '.edit_art', function() {
    $('#select-rasse').val('');
    $('#editrasse_id').val('');
    $('#art-list').attr('style', 'display:none;');
});


$(document).on('click', '.edit_rassenlist', function() {
    var ras_id = $(this).attr('data-id');
    var ras_name = $(this).attr('data-rasname');

    $('#select-rasse').val(ras_name);
    $('#editrasse_id').val(ras_id);
    $('#rasse-list').attr('style', 'display:none;');
});




$(document).on('keyup', '.editrassen', function() {
    $('#rasse_id').val('');

    var artid = $('#editart_id').val();
    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.editrassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 77,
                artid: artid,
                rassen: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="edit_rassenlist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.editrassen_list').append(list);
                    });
                } else {
                    $('.editrassen_list').html('');
                }
            }

        });
        return false;
    } else {
        $('.editrassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 78,
                artid: artid
            },
            success: function(res) {
                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="edit_rassenlist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.editrassen_list').append(list);
                    });
                }
            }
        });
        return false;
    }
});


$(document).on('click', '.edit_rassenlist', function() {
    var ras_id = $(this).attr('data-id');
    var ras_name = $(this).attr('data-rasname');

    $('#select-rasse').val(ras_name);
    $('#editrasse_id').val(ras_id);

});



$(document).on('keyup', '', function() {

    $('.add_rasse').val('');
    $('#rasse_id').val('');

    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.edit_artlist').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 68,
                art: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="edit_art" data-id="' + listing[index].id + '" data-artname="' + listing[index].art + '" >' + listing[index].art + '</li>';
                        $('.edit_artlist').append(list);
                    });
                } else {
                    $('.edit_artlist').html('');
                }
            }

        });
        return false;
    } else {

        $('.edit_artlist').html('');

        $('.edit_artlist').html('<li class="edit_art" data-id="3" data-artname="Alpakas"> Alpakas </li><li class="edit_art" data-id="4" data-artname="Bison"> Bison </li> <li class="edit_art" data-id="5" data-artname="Esel"> Esel     </li> <li class="edit_art" data-id="9" data-artname="Hirsch"> Hirsch   </li> <li class="edit_art" data-id="1" data-artname="Hunde"> Hunde </li> <li class="edit_art" data-id="2" data-artname="Katzen"> Katzen </li> <li class="edit_art" data-id="6" data-artname="Lamas"> Lamas </li> <li class="edit_art" data-id="7" data-artname="Pferde"> Pferde </li> <li class="edit_art" data-id="8" data-artname="Rehe"> Rehe     </li> <li class="edit_art" data-id="10" data-artname="Rinder"> Rinder  </li> <li class="edit_art" data-id="11" data-artname="Schafe">  Schafe  </li> <li class="edit_art" data-id="12" data-artname="Ziegen">  Ziegen  </li>');

        $('#art_id').val('');
    }


});


$(document).on('click', '.edit_art', function() {
    $('.editrassen_list').html('');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-artname');

    $('#select-art').val(name);
    $('#editart_id').val(id);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            artid: id,
            process: 69
        },
        success: function(res) {
            var listing = res.result.list;
            if (checkNotEmpty(listing)) {
                $.each(listing, function(index, value) {
                    var list = '<li class="edit_rassenlist" data-id="' + listing[index].id + '" data-artid="' + listing[index].art_id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                    $('.editrassen_list').append(list);

                });
                //$('#rasse-list').attr('style','display:block;');
            } else {
                $('.editrassen_list').html('');
            }
        }
    });
    return false;
});


$(document).on('click', '.edit_art', function() {
    $('#select-rasse').val('');
    $('#editrasse_id').val('');
    $('#art-list').attr('style', 'display:none;');
});


/* 
$(document).on('click','.artid',function(){
    $('.petartFocusList').slideUp();
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-artname');
    $('#select-artadd').val(name);
    $('#art_id').val(id);
    
    $.ajax({
        type:'POST',
        url:'home/ajax-actions',
        dataType:'JSON',
        data:{process:69, artid:id},
        success: function(res){
            var listing = res.result.list;
            if(checkNotEmpty(listing)){
                $.each(listing, function(index, value) {
                    var list ='<li class="add_rassen" data-id="'+listing[index].id+'" data-artid="'+listing[index].art_id+'" data-rasname="'+listing[index].rassen+'" >'+listing[index].rassen+'</li>';
                    $('.addrassen_list').append(list); 
                    
                });
                //$('#add-rasselist').attr('style','display:block;');
            }else{
                $('.addrassen_list').html(''); 
            }
        }
    });
});


 */

$(document).on('keyup', '#select-artadd', function() {
    $('.petartFocusList').slideDown();

    //  $('#select-addrasse').val('');
    //$('#rasse_id').val('');

    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.add_artlist').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 68,
                art: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="artid" data-id="' + listing[index].id + '" data-artname="' + listing[index].art + '" >' + listing[index].art + '</li>';
                        $('.add_artlist').append(list);
                    });
                } else {
                    $('.add_artlist').html('');
                }
            }

        });
        return false;
    } else {

        $('.add_artlist').html('');

        $('.add_artlist').html('<li class="artid" data-id="3" data-artname="Alpakas"> Alpakas </li><li class="artid" data-id="4" data-artname="Bison"> Bison </li> <li class="artid" data-id="5" data-artname="Esel"> Esel   </li> <li class="artid" data-id="9" data-artname="Hirsch"> Hirsch  </li> <li class="artid" data-id="1" data-artname="Hunde"> Hunde </li> <li class="artid" data-id="2" data-artname="Katzen"> Katzen   </li> <li class="artid" data-id="6" data-artname="Lamas"> Lamas </li> <li class="artid" data-id="7" data-artname="Pferde"> Pferde   </li> <li class="artid" data-id="8" data-artname="Rehe"> Rehe    </li> <li class="artid" data-id="10" data-artname="Rinder">    Rinder  </li> <li class="artid" data-id="11" data-artname="Schafe"> Schafe  </li> <li class="artid" data-id="12" data-artname="Ziegen"> Ziegen  </li>');

        //$('#art_id').val(''); 
    }


});



$(document).on('click', '.artid', function() {

    $('.addrassen_list').html('');
    var id = $(this).attr('data-id');
    var name = $(this).attr('data-artname');

    $('.petartFocusList').slideUp();

    $('#select-artadd').val(name);
    $('#art_id').val(id);

    $('#art_id').attr('data-art', id);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            artid: id,
            process: 69
        },
        success: function(res) {
            var listing = res.result.list;
            if (checkNotEmpty(listing)) {
                $.each(listing, function(index, value) {
                    var list = '<li class="add_rassenlist" data-id="' + listing[index].id + '" data-artid="' + listing[index].art_id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                    $('.addrassen_list').append(list);

                });
                //$('#add-rasselist').attr('style','display:block;');
            } else {
                $('.addrassen_list').html('');
            }
        }
    });
    return false;
});


$(document).on('click', '.artid', function() {
    $('#select-rasse').val('');
    $('#rasse_id').val('');
    $('#art-list').attr('style', 'display:none;');

    $('#select-addrasse').val('');
    $('#rasse_id').val('');

});



$(document).on('click', '.add_rassenlist', function() {
    var ras_id = $(this).attr('data-id');
    var ras_name = $(this).attr('data-rasname');

    $('#select-addrasse').val(ras_name);
    $('#rasse_id').val(ras_id);
    $('#rasse_id').attr('data-rasse', ras_id);

    $('#add-rasselist').attr('style', 'display:none;');
});


$(document).on('click', '#select-addrasse', function() {
    var art = $('#select-artadd').val();
    if (checkNotEmpty(art)) {
        $('#add-rasselist').attr('style', 'display:block;');
    }

});


$(document).on('keyup', '#select-addrasse', function() {
    $('#rasse_id').val('');

    var artid = $('#art_id').val();
    var txt = $(this).val();

    if (checkNotEmpty(txt)) {
        $('.addrassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 77,
                artid: artid,
                rassen: txt
            },
            success: function(res) {

                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="add_rassenlist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.addrassen_list').append(list);
                    });
                } else {
                    $('.addrassen_list').html('');
                }
            }

        });
        return false;
    } else {
        $('.addrassen_list').html('');
        $.ajax({
            method: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 78,
                artid: artid
            },
            success: function(res) {
                var listing = res.result.list;

                if (checkNotEmpty(listing)) {
                    $.each(listing, function(index, value) {
                        var list = '<li class="add_rassenlist" data-id="' + listing[index].id + '" data-rasname="' + listing[index].rassen + '" >' + listing[index].rassen + '</li>';
                        $('.addrassen_list').append(list);
                    });
                }
            }
        });
        return false;
    }
});


$(document).on('click', '.cmntCount_group', function() {
    var postid = $(this).attr('data-postid');
    var createdby = $(this).attr('data-createdby');
    var commentedby = $(this).attr('data-commented-user');
    var groupid = $(this).attr('data-groupid');
    $('.comment_section' + postid + '').attr('style', 'display:block;');

    var txt = '<input type="text" class="form-control b-ras-30 submit_comment" data-groupid="' + groupid + '"  data-groupCmnt="1" id="enter_comment" placeholder="Einen Kommentar posten" data-postid="' + postid + '" data-createdby="' + createdby + '" data-commented-user="' + commentedby + '"   value="">';

    $('.comment_' + postid).html(txt);
});



$(document).on('click', '.cmntCount', function() {
    var postid = $(this).attr('data-postid');
    var createdby = $(this).attr('data-createdby');
    var commentedby = $(this).attr('data-commented-user');

    $('.comment_section' + postid + '').attr('style', 'display:block;');

    var txt = '<input type="text" class="form-control b-ras-30 submit_comment"  data-groupid=""  data-groupCmnt="0" id="enter_comment" placeholder="Einen Kommentar posten" data-postid="' + postid + '" data-createdby="' + createdby + '" data-commented-user="' + commentedby + '"   value="">';

    $('.comment_' + postid).html(txt);
});

$(document).on('click', '.reply_comment', function() {
    var postid = $(this).attr('data-post-id');
    //  $('.comment_section'+postid+'').attr('style','display:block;');
});

$(document).on('click', '.det-chat-attach', function() {
    var rec = $(this).attr('data-rec');
    $('.chatUploadAttch' + rec).hide();
    $('#chatUpload' + rec).val('');
});

$(document).on('click', '.total_friends', function() {
    var userid = $(this).attr('data-id');
    location.href = 'friendlist?id=' + userid;
});

$(document).on('click', '.total_friendsothers', function() {
    var userid = $(this).attr('data-id');
    location.href = 'friendlistothers?id=' + userid;
});

$(document).on('click', '.user_petcount', function() {
    location.href = 'pets';
});

$(document).on('click', '.user_postcount', function() {
    location.href = 'timeline';
});


$('#edit_imageLoader').on('change', editimageCroppie);

function editimageCroppie(e) {

    $('.cr-boundary').hide();
    $('.cr-slider-wrap').hide();

    //$('.cropResult-base').hide();
    var fileList = this.files;
    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(fileList[0]);

    var $uploadCrop = $('#editimageBox');
    $uploadCrop.croppie({
        enableExif: false,
        viewport: {
            width: 160,
            height: 160,
            type: 'circle'
        },
        boundary: {
            width: 250,
            height: 250
        }
    });

    $uploadCrop.croppie('bind', objectUrl);
    $('#crop_pet').show();
}

$(document).on('click', '#crop_pet', function() {
    $('#save_edit').show();
});


$('#crop_pet').click(function(e) {
    $('.cropResult-base').show();
    var mc = $('#editimageBox');
    mc.croppie('result', {
        type: 'rawcanvas',
        circle: true,
        size: {
            width: 300,
            height: 300
        },
        format: 'png'
    }).then(function(canvas) {
        $('#save_edit').attr('data-img', canvas.toDataURL());

        $('#cropped_img_edit').attr('src', canvas.toDataURL());

    });
});

$('#editpet_imageLoader').on('change', editpetimageCroppie);

function editpetimageCroppie(e) {

    $('.cr-boundary').hide();
    $('.cr-slider-wrap').hide();

    //$('.cropResult-base').hide();
    var fileList = this.files;
    var anyWindow = window.URL || window.webkitURL;
    var objectUrl = anyWindow.createObjectURL(fileList[0]);

    var $uploadCrop = $('#editpetimageBox');
    $uploadCrop.croppie({
        enableExif: false,
        viewport: {
            width: 160,
            height: 160,
            type: 'circle'
        },
        boundary: {
            width: 250,
            height: 250
        }
    });

    $uploadCrop.croppie('bind', objectUrl);
    $('#crop_petimg').show();
}

$(document).on('click', '#crop_petimg', function() {
    $('#save_petprofile').show();
});

$('#crop_petimg').click(function(e) {
    $('.cropResult-base').show();
    var mc = $('#editpetimageBox');
    mc.croppie('result', {
        type: 'rawcanvas',
        circle: true,
        size: {
            width: 300,
            height: 300
        },
        format: 'png'
    }).then(function(canvas) {
        $('#save_petprofile').attr('data-img', canvas.toDataURL());

        $('#cropped_img_pet').attr('src', canvas.toDataURL());

    });
});


$(document).on('click', '.remove_frnd', function() {
    var frndid = $(this).attr('data-id');
    alertify.confirm('Möchten Sie diesen Freund löschen?', function(res) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 80,
                id: frndid
            },
            success: function(res) {
                if (res.result.status == "success") {
                    //alertify.alert('Freund wurde von Ihrer Liste entfernt');
                }
            }
        });
        location.reload();
    });
});


$(document).on('click', '.remove_groupmem', function() {
    var memid = $(this).attr('data-id');
    var groupid = $(this).attr('data-groupid');
    alertify.confirm('Möchten Sie diesen Freund aus der Gruppe entfernen?', function(res) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            dataType: 'JSON',
            data: {
                process: 84,
                id: memid,
                groupid: groupid
            },
            success: function(res) {
                if (res.result.status == "success") {
                    //alertify.alert('Freund wurde von Ihrer Liste entfernt');
                }
            }
        });
        location.reload();
    });
});


/*   

function getVisible() {    
    var $el = $('.postid'),
        scrollTop = $(this).scrollTop(),
        scrollBot = scrollTop + $(this).height(),
        elTop = $el.offset().top,
        elBottom = elTop + $el.outerHeight(),
        visibleTop = elTop < scrollTop ? scrollTop : elTop,
        visibleBottom = elBottom > scrollBot ? scrollBot : elBottom;
    var videoVisible = (visibleBottom - visibleTop);
   console.log(videoVisible);
   
  var height =  $(".postid").height();
  var divId = $('.postid').attr('data-postid');
 // alert(divId);
var visDiv = $(".post"+divId+":visible");

//console.log(visDiv);
   var myVideo = $('.myVideo');
   if((videoVisible>195) && (videoVisible<360)){
 
          myVideo.play();
        // $(".myVideo").is(':visible');
   }else{
       
        // myVideo.pause();
      //  $(".myVideo").not(':visible') 
   }    
}

$(window).on('scroll resize', getVisible);  

 */

var isTabActive;
window.onfocus = function() {
    isTabActive = 1;
};
window.onblur = function() {
    isTabActive = 2;
};
setInterval(function() {
    if (isTabActive == 2) {
        location.href = '/';
    }
}, 1000000);


$(document).on('click', '.chat_profile', function() {
    var userid = $(this).attr('data-id');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        dataType: 'JSON',
        data: {
            process: 82,
            id: userid
        },
        success: function(res) {
            if (res.result.status == "success") {
                var id = res.result.id;
                location.href = "/profileinfo?id=" + id;
            }
        }
    });
});


$(document).on('click', '.frndnotify', function() {
    var id = $(this).attr('data-notifyid');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 41,
            id: id
        },
        dataType: 'JSON',
        success: function(res) {

        }
    });

});

$(document).on('click', '.reply_open', function() {
    var cmtid = $(this).attr('data-comment-id');
    $('.reply_open_box' + cmtid).slideToggle();
});

/* $(document).on('click','.dropreplybox',function(){
 
    var cmnt = $(this).attr('data-comment-id');
 
    $('.replybox_'+cmnt).attr('style','display:block;');
}); */


$(document).on('click', '.replyImgUploadAppend', function() {

    var cmntid = $(this).attr('data-cmntid');

    $('#replyImageUpload' + cmntid).trigger('click');
});

$(window).on('scroll resize', loadVideo);

function loadVideo() {
    $('.myVideo').each(function() {
        var $el = $(this),
            scrollTop = $(window).scrollTop();
        scrollBot = scrollTop + $(window).height();
        elTop = $el.offset().top;
        elBottom = elTop + $el.outerHeight();
        $(this).get(0).pause();
        if (elTop >= scrollTop && elBottom <= scrollBot) {
            $(this).get(0).play();
        }
    });
}


$(document).on('click', '.review_submit', function() {
    var form_data = new FormData($('form#reviews')[0]);
    form_data.append('process', 115);
    $("#reviewModal").modal("hide");

    var rname = $('#rname').val();
    var rtitle = $('#rtitle').val();
    var rdescription = $('#rdescription').val();

    if (rname == '') {
        $('#rname').closest('.form-group').find('.errorMsg').show();
    } else if (rtitle == '') {
        $('#rtitle').closest('.form-group').find('.errorMsg').show();
    } else if (rdescription == '') {
        $('#rdescription').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == "success") {
                    $('.review-text').html('<p>Vielen Dank, dass Sie sich die Zeit genommen haben, das Produkt zu bewerten! Für uns sind sowohl positive als auch negative Rückmeldungen sehr wichtig. Wir werden Ihre Bewertung prüfen und innerhalb von 1-2 Arbeitstagen veröffentlichen.</p>');
                    $("#reviewModal").modal("show");
                    $('#reviews')[0].reset();
                    $('#rdescription').closest('.form-group').find('.errorMsg').hide();
                    $('#rname').closest('.form-group').find('.errorMsg').hide();
                    $('#rtitle').closest('.form-group').find('.errorMsg').hide();
                }
            }
        })
        return false;
    };

});


$(document).on('click', '.add_to_cart', function() {

    var pid = $(this).attr('product-id');
    var vid = $(this).attr('var-id');
    var qty = $('#quantity' + vid).val();
    var prpkilo = $('#priceperkilo' + vid).text();
    var totprice = qty * prpkilo;
    console.log(pid);
    if (vid) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            data: {
                process: 116,
                pid: pid,
                vid: vid,
                qty: qty,
                prpkilo: prpkilo,
                totprice: totprice
            },
            dataType: 'JSON',
            success: function(res) {
                console.log(res);

            }
        })
        return false;
    }



});


$(document).on('click', '.remove_cart_items', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            process: 117,
            id: id
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                window.location.reload();
            }
        }
    });

});
$(".quantity").change(function() {
    var pid = $(this).attr('prod-id');
    var vid = $(this).attr('var-id');
    var qty = $(this).val()
    var prpkilo = $(this).attr('per-kilo');
    var totprice = qty * prpkilo;
    if (vid) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            data: {
                process: 118,
                pid: pid,
                vid: vid,
                qty: qty,
                prpkilo: prpkilo,
                totprice: totprice
            },
            dataType: 'JSON',
            success: function(res) {
                window.location.reload();
            }
        })
        return false;
    }

});


$(document).on('click', '.address_submit', function() {
    var form_data = new FormData($('form#orderaddress')[0]);
    form_data.append('process', 119);

    var ad_vorname = $('#ad_vorname').val();
    var ad_nachname = $('#ad_nachname').val();
    var ad_address = $('#ad_address').val();
    var ad_plz = $('#ad_plz').val();
    var ad_ort = $('#ad_ort').val();
    if (ad_vorname == '') {
        $('#ad_vorname').closest('.form-group').find('.errorMsg').show();
    } else if (ad_nachname == '') {
        $('#ad_nachname').closest('.form-group').find('.errorMsg').show();
    } else if (ad_address == '') {
        $('#ad_address').closest('.form-group').find('.errorMsg').show();
    } else if (ad_plz == '') {
        $('#ad_plz').closest('.form-group').find('.errorMsg').show();
    } else if (ad_ort == '') {
        $('#ad_ort').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == "success") {
                    $("#enable_next").css("display", "block");
                    $(".address_submit").css("display", "none");
                    $('#headingtwo').attr('data-target', '#collapseTwo');
                }
            }
        })
        return false;
    };

});


$(document).on('click', '.address_submit1', function() {
    var form_data = new FormData($('form#orderaddress1')[0]);
    form_data.append('process', 120);

    var ad_vorname = $('#ad_vorname1').val();
    var ad_nachname = $('#ad_nachname1').val();
    var ad_address = $('#ad_address1').val();
    var ad_plz = $('#ad_plz1').val();
    var ad_ort = $('#ad_ort1').val();
    if (ad_vorname == '') {
        $('#ad_vorname1').closest('.form-group').find('.errorMsg').show();
    } else if (ad_nachname == '') {
        $('#ad_nachname1').closest('.form-group').find('.errorMsg').show();
    } else if (ad_address == '') {
        $('#ad_address1').closest('.form-group').find('.errorMsg').show();
    } else if (ad_plz == '') {
        $('#ad_plz1').closest('.form-group').find('.errorMsg').show();
    } else if (ad_ort == '') {
        $('#ad_ort1').closest('.form-group').find('.errorMsg').show();
    } else {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            contentType: false,
            processData: false,
            data: form_data,
            dataType: 'JSON',
            success: function(res) {
                if (res.result.status == "success") {
                    $("#enable_next1").css("display", "block");
                    $(".address_submit1").css("display", "none");
                    $('#headingtwo').attr('data-target', '#collapseTwo');
                }
            }
        })
        return false;
    };

});


$(document).on('click', '.shipping_method', function() {
    var form_data = new FormData($('form#shipping')[0]);
    form_data.append('process', 121);

    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $("#enable_next2").css("display", "block");
                $(".shipping_method").css("display", "none");
                $('#headingthree').attr('data-target', '#collapseThree');
            }
        }
    })
    return false;

});

$(document).on('click', '.payment_type', function() {
    var form_data = new FormData($('form#paymenttype')[0]);
    form_data.append('process', 122);
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $("#enable_next3").css("display", "block");
                $(".payment_type").css("display", "none");
            }
        }
    })
    return false;

});


$(document).on('click', '.enable_next3', function() {
    var total_price = $(this).attr('tot-price');
    $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            tprice: total_price,
            paymenttype: 'cashondelivery',
            process: 123
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
                $("#collapseOne").removeClass("show");
                $("#collapseTwo").removeClass("show");
                $("#collapseThree").removeClass("show");
                $("#collapseFour").addClass("show");
                $('#headingfour').attr('data-target', '#collapseFour');
                setTimeout(function() {
                    window.location.reload();
                }, 3000);

            }
        }
    })
    return false;

});




$(document).on('click', '#enable_next', function() {
    $("#collapseTwo").addClass("show");
    $("#collapseOne").removeClass("show");
});

$(document).on('click', '#enable_next1', function() {
    $("#collapseOne").removeClass("show");
    $("#collapseTwo").addClass("show");

});

$(document).on('click', '#enable_next2', function() {
    $("#collapseOne").removeClass("show");
    $("#collapseTwo").removeClass("show");
    $("#collapseThree").addClass("show");
});


$(document).on('click', '.fav-product', function() {
     var product_id = $(this).attr('product-id');
     if(product_id){
     $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            pid: product_id,            
            process: 125
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
               window.location.reload();
            }
        }
    })
 }
    return false;    

});

$(document).on('click', '.unfav-product', function() {
     var product_id = $(this).attr('product-id');
     if(product_id){
          $.ajax({
        type: 'POST',
        url: 'home/ajax-actions',
        data: {
            pid: product_id,            
            process: 126
        },
        dataType: 'JSON',
        success: function(res) {
            if (res.result.status == "success") {
               window.location.reload();
            }
        }
    })
}
    return false;    

});

$(document).on('click', '.add-to-cart', function() {

    var pid = $(this).attr('product-id');
    var qty = 1;
    var kilogram = $(this).attr('product-varient');
    var prpkilo = $(this).attr('product-price');
    var totprice = prpkilo;   
    if (pid) {
        $.ajax({
            type: 'POST',
            url: 'home/ajax-actions',
            cache: false,
            data: {
                process: 127,
                pid: pid,  
                kilogram:kilogram,        
                qty: qty,
                prpkilo: prpkilo,
                totprice: totprice
            },
            dataType: 'JSON',
            success: function(res) {              
                 location.href = '/cart';

            }
        })
        return false;
    }



});

