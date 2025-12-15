from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Booking, Trip, Feedback, Offer
from decimal import Decimal

User = get_user_model()


# ======================
# REGISTER
# ======================
class RegisterSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_login(self, value):
        if User.objects.filter(login=value).exists():
            raise serializers.ValidationError("Логин уже занят")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email уже используется")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


# ======================
# LOGIN
# ======================
class LoginSerializer(TokenObtainPairSerializer):
    username_field = "login"


# ======================
# USER PROFILE
# ======================
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "login",
            "email",
            "avatar",
            "is_staff",
            "is_superuser",
        )
# ======================
# TRIP
# ======================
class TripSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trip
        fields = ("id", "title", "price", "date_start", "date_end")


# ======================
# BOOKING
# ======================
class BookingSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)

    class Meta:
        model = Booking
        fields = (
            "id",
            "trip",
            "persons",
            "total_price",
            "status",
            "booking_date",
        )


# ======================
# FEEDBACK
# ======================
class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = ("id", "name", "email", "phone", "message", "created_at")
        read_only_fields = ("created_at",)


# ======================
# OFFER
# ======================
class OfferSerializer(serializers.ModelSerializer):
    final_price = serializers.SerializerMethodField()
    trip_price = serializers.DecimalField(
        source="trip.price",
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Offer
        fields = "__all__"

    def get_final_price(self, obj):
        price = obj.trip.price  # Decimal
        discount = Decimal(obj.discount_percent) / Decimal("100")
        final_price = price * (Decimal("1") - discount)
        return final_price.quantize(Decimal("0.01"))
