/* Swiss-French initialisation for the jQuery UI date picker plugin. */
/* Written Martin Voelkle (martin.voelkle@e-tc.ch). */
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "../widgets/datepicker" ], factory );
	} else {

		// Browser globals
		factory( jQuery.datepicker );
	}
}( function( datepicker ) {

datepicker.regional[ "fr-CH" ] = {
	closeText: "Fermer",
	prevText: "&#x3C;Préc",
	nextText: "Suiv&#x3E;",
	currentText: "Courant",
	monthNames: [ "Januar", "Februar", "März", "April", "Mai", "Juni",
		"Juli", "August", "September", "Oktober", "November", "Dezember" ],
	monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Mai", "Jun",
		"Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ],
	dayNames: [ "Sonntag", "Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"],
	dayNamesShort: ["Son","Mon","Die","Mit","Don","Fre","Sam"],
	dayNamesMin: [ "So","Mo","Di","Mi","Do","Fr","Sa"],
	weekHeader: "Sm",
	dateFormat: "dd.mm.yy",
	firstDay: 1,
	isRTL: false,
	showMonthAfterYear: false,
	yearSuffix: "" };
datepicker.setDefaults( datepicker.regional[ "fr-CH" ] );

return datepicker.regional[ "fr-CH" ];

} ) );