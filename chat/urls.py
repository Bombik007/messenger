from django.conf.urls import url
from . import views

appName = "chat"

urlpatterns = [
    url(r'^about/$', views.index, name='index'),
    url(r'^logout/$', views.logout_user, name='logout'),
    url(r'^chat/$', views.chat, name='chat'),
    url(r'^profile/$', views.user_profile, name='user_profile'),
    url(r'^profile/edit/$', views.user_profile_edit, name='edit_profile'),
    url(r'^user/id(?P<profile_id>[0-9]+)/$', views.user_profile_search_result, name='user_profile_search_result'),
    url(r'^search/$', views.search_result, name='people'),

    url(r'^register/$', views.UserFormView.as_view(), name='register'),
    url(r'^login/$', views.login_user, name='login_user')
]