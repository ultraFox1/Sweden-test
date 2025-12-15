from django.contrib import admin
from django.utils.html import format_html
from .models import User, Trip, Booking, Feedback, Offer


# ======================
# USER ADMIN
# ======================
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "login", "email", "avatar_preview", "is_staff", "is_active")
    search_fields = ("login", "email")
    list_filter = ("is_staff", "is_active")

    def avatar_preview(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" width="40" height="40" style="border-radius:50%;" />',
                obj.avatar.url
            )
        return "—"

    avatar_preview.short_description = "Avatar"


# ======================
# TRIP ADMIN (ПОЕЗДКИ)
# ======================
@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "price", "date_start", "date_end", "created_at")
    search_fields = ("title",)
    list_filter = ("date_start", "date_end")
    ordering = ("-created_at",)


# ======================
# BOOKING ADMIN (ЗАЯВКИ)
# ======================
@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "trip",
        "user",
        "persons",
        "total_price",
        "status",
        "booking_date",
    )

    #позволяет менять статус прямо в списке
    list_editable = ("status",)

    list_filter = ("status", "booking_date")
    search_fields = ("trip__title", "user__login")
    ordering = ("-booking_date",)

    # менеджер и админ могут редактировать заявки
    def has_change_permission(self, request, obj=None):
        return request.user.is_staff or request.user.is_superuser

    # удалять заявки может только админ
    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser



# ======================
# FEEDBACK ADMIN
# ======================
@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "created_at")
    search_fields = ("name", "email", "phone")
    list_filter = ("created_at",)


@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "discount_percent", "is_active", "created_at")
    list_filter = ("is_active",)
    search_fields = ("title",)