from django import template
register = template.Library()


def get_first_letter(value):
    return value[0]


register.filter('get_first_letter', get_first_letter)