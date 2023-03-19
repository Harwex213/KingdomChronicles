namespace KingdomChronicles.Services.Internal;

public static class Utils
{
    public static string GetRandomHexColor()
    {
        return $"#{new Random().Next(0x1000000):X6}";
    }
}