ID_FILTERS = ["exact", "in"]
GENERIC_FILTERS = ["exact", "iexact", "in", "isnull"]
BOOLEAN_FILTERS = GENERIC_FILTERS
TEXT_FILTERS = [
    "contains",
    "icontains",
    "startswith",
    "istartswith",
    "endswith",
    "endswith",
    "regex",
    "iregex",
] + GENERIC_FILTERS
NUMBER_FILTERS = ["gt", "gte", "lt", "lte"] + GENERIC_FILTERS
TIME_FIELDS = ["hour", "minute", "second"] + NUMBER_FILTERS
DATE_FIELDS = [
    "year",
    "iso_year",
    "month",
    "day",
    "week",
    "week_day",
    "iso_week_day",
    "quarter",
] + NUMBER_FILTERS
DATETIME_FILTERS = DATE_FIELDS + ["hour", "minute", "second"]
