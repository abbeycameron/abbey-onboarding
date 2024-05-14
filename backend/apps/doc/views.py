import typing
import json
from django.views.generic import TemplateView
from django.contrib.staticfiles import finders
from django.contrib.sites.shortcuts import get_current_site
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework import status
from django_extensions.management.commands.show_urls import Command as ShowUrls
import markdown


class MarkdownView(TemplateView):
    login_url = "/api-auth/login/"
    markdown_name = ""
    template_name = "doc/markdown.html"
    name = ""
    breadcrumblist = []

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        md_path = finders.find(self.markdown_name, all=False)
        assert (
            md_path
        ), "The markdown file was not found. make sure it is under a 'static' folder."
        with open(md_path, "r", encoding="utf-8") as input_file:
            text = input_file.read()
        context["markdown_content"] = markdown.markdown(text)
        context["name"] = self.name
        context["breadcrumblist"] = self.breadcrumblist
        return context


class HomeView(MarkdownView):
    markdown_name = "doc/home.md"
    name = "Home"
    breadcrumblist = [("Home", "/")]


class EndpointsView(APIView):
    """
    Here are all the endpoints available. Please note that:

    - A single url is displayed per View/ViewSet
    - Django urls (like the admin site urls) are not displayed
    """

    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, format=None):
        domain = get_current_site(self.request).domain
        protocol = "https" if self.request.is_secure() else "http"
        show_urls: typing.List[dict] = json.loads(
            ShowUrls().handle(
                format_style="json",
                no_color=True,
                language=None,
                decorator=[],
                urlconf="ROOT_URLCONF",
                unsorted=False,
            )
        )
        used_modules = set()
        unique_urls = []
        for url_obj in show_urls:
            if url_obj["module"] in used_modules or url_obj["module"].startswith(
                "django"
            ):
                continue
            unique_urls.append(url_obj)
            used_modules.add(url_obj["module"])
        unique_urls.sort(key=lambda obj: obj["module"])
        urls = list(
            map(
                lambda obj: {
                    "url": f"{protocol}://{domain}{obj['url']}",
                    "module": obj["module"],
                },
                unique_urls,
            )
        )
        return Response(urls, status=status.HTTP_200_OK)
