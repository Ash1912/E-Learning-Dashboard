using FullStackApp.Server.Models;

namespace FullStackApp.Server.Services
{
    public interface IAuthService
    {
        Task<string> RegisterUser(User user);
        Task<string> LoginUser(User user);
    }
}
