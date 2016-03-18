from rest_framework import permissions


class CustomPermissions(permissions.IsAuthenticatedOrReadOnly):
    def has_object_permission(self, request, view, obj):
		if obj.followed == request.user:
			return True