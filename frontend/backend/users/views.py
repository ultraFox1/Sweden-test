from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import status
from decimal import Decimal

from .models import Trip, Booking, Offer
from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserProfileSerializer,
    FeedbackSerializer,
    BookingSerializer,
    TripSerializer,
    OfferSerializer,
)

# ======================
# REGISTRATION
# ======================
@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User created"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ======================
# LOGIN
# ======================
class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


# ======================
# PROFILE
# ======================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    serializer = UserProfileSerializer(request.user)
    return Response(serializer.data)


# ======================
# AVATAR
# ======================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def upload_avatar(request):
    avatar = request.FILES.get("avatar")

    if not avatar:
        return Response(
            {"error": "No file provided"},
            status=status.HTTP_400_BAD_REQUEST
        )

    request.user.avatar = avatar
    request.user.save()
    return Response({"message": "Avatar updated"})


# ======================
# FEEDBACK
# ======================
@api_view(["POST"])
def send_feedback(request):
    serializer = FeedbackSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "Сообщение отправлено"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ======================
# CREATE BOOKING
# ======================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_booking(request):
    trip_id = request.data.get("trip")
    offer_id = request.data.get("offer")
    persons = int(request.data.get("persons", 1))

    # БРОНИРОВАНИЕ ПО АКЦИИ
    if offer_id:
        try:
            offer = Offer.objects.select_related("trip").get(
                id=offer_id,
                is_active=True
            )
        except Offer.DoesNotExist:
            return Response(
                {"error": "Акция не найдена"},
                status=400
            )

        trip = offer.trip
        discount = Decimal(offer.discount_percent) / Decimal("100")
        final_price = trip.price * (Decimal("1") - discount)
        total_price = final_price * persons

    # ОБЫЧНОЕ БРОНИРОВАНИЕ
    elif trip_id:
        try:
            trip = Trip.objects.get(id=trip_id)
        except Trip.DoesNotExist:
            return Response(
                {"error": "Поездка не найдена"},
                status=400
            )

        total_price = trip.price * persons

    else:
        return Response(
            {"error": "Не указана поездка"},
            status=400
        )

    booking = Booking.objects.create(
        user=request.user,
        trip=trip,
        persons=persons,
        total_price=total_price,
    )

    return Response(
        BookingSerializer(booking).data,
        status=201
    )



# ======================
# USER BOOKINGS
# ======================
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_bookings(request):
    bookings = request.user.bookings.all().order_by("-booking_date")
    serializer = BookingSerializer(bookings, many=True)
    return Response(serializer.data)


# ======================
# CANCEL BOOKING
# ======================
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_booking(request, booking_id):
    try:
        booking = Booking.objects.get(
            id=booking_id,
            user=request.user
        )
    except Booking.DoesNotExist:
        return Response(
            {"error": "Заявка не найдена"},
            status=status.HTTP_404_NOT_FOUND
        )

    if booking.status != "created":
        return Response(
            {"error": "Нельзя отменить эту заявку"},
            status=status.HTTP_400_BAD_REQUEST
        )

    booking.status = "cancelled"
    booking.save()

    return Response({"message": "Заявка отменена"})


# ======================
# TRIPS LIST
# ======================
@api_view(["GET"])
def trips_list(request):
    trips = Trip.objects.all().order_by("date_start")
    serializer = TripSerializer(trips, many=True)
    return Response(serializer.data)


# ======================
# OFFERS LIST
# ======================
@api_view(["GET"])
def offers_list(request):
    offers = Offer.objects.filter(is_active=True).order_by("-created_at")
    serializer = OfferSerializer(offers, many=True)
    return Response(serializer.data)
