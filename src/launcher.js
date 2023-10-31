ConfigureMultiplayer({
	name: "Thermal Expansion BE",
	version: "1.0",
	isClientOnly: true
});
ModAPI.addAPICallback("FoundationAPI", function(api){
    Launch({FoundationAPI: api});
});