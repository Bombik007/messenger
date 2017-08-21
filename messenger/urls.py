from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.urlpatterns import format_suffix_patterns
from chat import views


admin.autodiscover()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^messenger/', include('chat.urls')),
    url(r'^about/$', views.index, name='index'),
    url(r'^displayMsgs/$', views.MessageManager.as_view()),
    url(r'^send/$', views.MessageManager.as_view()),
    url(r'^send_email/$', views.send_email),
    url(r'^createchat/$', views.create_chat_room),
]

urlpatterns = format_suffix_patterns(urlpatterns)

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if not settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

