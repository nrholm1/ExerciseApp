using System;
using System.Globalization;

namespace ExerciseAPI.Utils
{
    public class AppException : Exception
    {
        public AppException() : base() {}

        public AppException(string msg) : base(msg) {}

        public AppException(string msg, params object[] args)
        : base(string.Format(CultureInfo.CurrentCulture, msg, args)) 
        {}
    }
}
