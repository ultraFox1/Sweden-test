from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager
)

# ======================
# USER MANAGER
# ======================
class UserManager(BaseUserManager):
    def create_user(self, login, email, password=None, **extra_fields):
        if not login:
            raise ValueError("Login is required")
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(login=login, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(login, email, password, **extra_fields)


# ======================
# USER
# ======================
class User(AbstractBaseUser, PermissionsMixin):
    login = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "login"
    REQUIRED_FIELDS = ["email"]

    objects = UserManager()

    def __str__(self):
        return self.login


# ======================
# TRIP (ПОЕЗДКИ)
# ======================
class Trip(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    image = models.ImageField(
        upload_to="trips/",
        blank=True,
        null=True
    )

    date_start = models.DateField()
    date_end = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title




# ======================
# BOOKING (БРОНИРОВАНИЯ)
# ======================
class Booking(models.Model):
    STATUS_CHOICES = (
        ("created", "Создано"),
        ("confirmed", "Подтверждено"),
        ("cancelled", "Отменено"),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    persons = models.PositiveIntegerField(default=1)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,   
        default="created"
    )

    booking_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.trip.title} — {self.user.login}"




# ======================
# FEEDBACK
# ======================
class Feedback(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.email})"

class Offer(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    discount_percent = models.PositiveIntegerField()
    
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name="offers",
        null=True,      # ← важно
        blank=True
    )

    image = models.ImageField(upload_to="offers/", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)


