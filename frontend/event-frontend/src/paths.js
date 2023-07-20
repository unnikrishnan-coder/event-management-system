const basePath = "http://localhost:3000";

const paths = {
    login:`${basePath}/login`,
    signup:`${basePath}/signup`,
    addEvent:`${basePath}/dash/add-event/`,
    allEvents:`${basePath}/dash/all-events`,
    publishedEvents:`${basePath}/dash/all-published-events`,
    home:`${basePath}/dash/home`,
    regEvents:`${basePath}/dash/reg-events`,
    payment:`${basePath}/payment`,
    artists:`${basePath}/artists`,
    createdEvents:`${basePath}/dash/created`,
    deleteEvent:`${basePath}/dash/deleteEvent`,
    getUser:`${basePath}/dash/getUser`,
    updateUser:`${basePath}/dash/updateProfile`,
    updateEvent:`${basePath}/dash/update-event`,
    getEvent:`${basePath}/dash/event/`,
    viewRegistered:`${basePath}/dash/view-registered`,
    checkIn:`${basePath}/dash/checkin`,
    addArtist:`${basePath}/dash/add-artist`,
    viewArtists:`${basePath}/dash/view-artists`,
    deleteArtist:`${basePath}/dash/delete-artist`,
    addVenue:`${basePath}/dash/add-venue`,
    viewVenues:`${basePath}/dash/all-venues`,
    viewAvailableVenues:`${basePath}/dash/available-venues`,
    deleteVenue:`${basePath}/dash/delete-venue`,
    updateVenue:`${basePath}/dash/update-venue`,
    viewSingleVenue:`${basePath}/dash/single-venue`,
    getQR:`${basePath}/dash/getqr`

}

export default paths;