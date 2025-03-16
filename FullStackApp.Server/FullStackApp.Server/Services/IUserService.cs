using FullStackApp.Server.Models;

namespace FullStackApp.Server.Services
{
    public interface IUserService
    {
        Task<User> GetUserById(int userId);
        Task<string> UpdateUser(User updatedUser);
    }
}
