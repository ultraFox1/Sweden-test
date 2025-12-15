from django.urls import path
from .views import cancel_booking
from .views import offers_list
from .views import (
    register,
    LoginView,
    me,
    upload_avatar,
    send_feedback,
    create_booking,
    my_bookings,
    trips_list,
)

urlpatterns = [
    path("register/", register),
    path("login/", LoginView.as_view()),
    path("me/", me),
    path("avatar/", upload_avatar),
    path("feedback/", send_feedback),
    path("bookings/<int:booking_id>/cancel/", cancel_booking),
    path("offers/", offers_list),

    path("bookings/", create_booking),       # POST
    path("bookings/my/", my_bookings),        # GET
    path("trips/", trips_list),               # GET
]
