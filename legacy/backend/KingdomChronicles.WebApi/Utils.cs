using System.ComponentModel.DataAnnotations;

namespace KingdomChronicles.WebApi;

public static class Utils
{
    public static (bool, string?) Validate(object objectToValidate)
    {
        var context = new ValidationContext(objectToValidate);
        var results = new List<ValidationResult>();
        if (Validator.TryValidateObject(objectToValidate, context, results, true))
        {
            return (true, null);
        }

        var error = results.First().ErrorMessage;
        return (false, error);

    }
}