from django.contrib.auth.models import User
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from models import Author
#
#
# @receiver(post_save, sender=User)
# def handle_user_save(sender, instance, created, **kwargs):
#     if created:
#         Author.objects.create(user=instance)


# @receiver(pre_save, sender=User)
# def deactivate_author(sender, instance, **kwargs):
#     if instance._state.adding and not instance.is_superuser:
#         instance.is_active = False;
#     else:
#         pass
