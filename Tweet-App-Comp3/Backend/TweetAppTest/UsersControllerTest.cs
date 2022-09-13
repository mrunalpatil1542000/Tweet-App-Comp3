

#nullable disable
using AutoFixture;
using Moq;
using System.Linq.Expressions;
using TweetApp.Controllers;
using TweetApp.MessegeSender;
using TweetApp.TweetAppModel.Dto;
using TweetApp.TweetAppModel.Input;
using TweetApp.TweetAppRepository.Entities;
using TweetApp.TweetAppRepository.Interfaces;
using TweetApp.TweetAppService.Services.Interfaces;

namespace TweetAppTest
{
    [TestClass]
    public class UsersControllerTest
    {
        private Mock<IKafkaSender> _kafkaSender;
        private Mock<IServices> _tweetService;
        private Fixture _fixture;
        private UsersController _controller;
        private Mock<IUnitOfWork> _unitOfWork;
        //private Mock<ITweetRepository> _mockTweetRepo;
        // private readonly TweetAppService _tweetAppService;

        public UsersControllerTest()
        {
            _kafkaSender = new Mock<IKafkaSender>();
            _tweetService = new Mock<IServices>();
            _fixture = new Fixture();
            _unitOfWork = new Mock<IUnitOfWork>();

        }

        [TestMethod]
        public async Task GetAllUsers_Test()
        {

            var userList = _fixture.CreateMany<User>(3);

            _unitOfWork.Setup(u => u.User.GetAllAsync(It.IsAny<Expression<Func<User, bool>>>(), null)).ReturnsAsync(userList);

            _controller = new UsersController(_tweetService.Object, _kafkaSender.Object);
            var result = await _controller.GetAllUsers();

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public async Task Register_Test()
        {

            var userList = _fixture.CreateMany<User>(3);
            var userListDto = _fixture.CreateMany<UserDto>(3) as UserDto;

            _unitOfWork.Setup(u => u.User.AddAsync(It.IsAny<User>()));

            _controller = new UsersController(_tweetService.Object, _kafkaSender.Object);
            var result = await _controller.Register(userListDto);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public async Task Login_Test()
        {

            var userList = _fixture.CreateMany<User>(3);
            var userLoginDto = _fixture.CreateMany<LoginDto>(3) as LoginDto;

            _unitOfWork.Setup(u => u.User.GetFirstOrDefaultAsync(It.IsAny<Expression<Func<User, bool>>>(), null));

            _controller = new UsersController(_tweetService.Object, _kafkaSender.Object);
            var result = await _controller.Login(userLoginDto);

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public async Task ForgotPassword_Test()
        {

            var userList = _fixture.CreateMany<User>(3) as User;

            _unitOfWork.Setup(u => u.User.Update(userList));

            _controller = new UsersController(_tweetService.Object, _kafkaSender.Object);
            var result = await _controller.ForgotPassword(It.IsAny<string>(), It.IsAny<ForgotPassword>());

            Assert.IsNotNull(result);
        }

        [TestMethod]
        public async Task SearchUsername_Test()
        { 
            var userList = _fixture.CreateMany<User>(3) as User;

            _unitOfWork.Setup(u => u.User.GetFirstOrDefaultAsync(It.IsAny<Expression<Func<User, bool>>>(), null));

            _controller = new UsersController(_tweetService.Object, _kafkaSender.Object);
            var result = await _controller.SearchUsername(It.IsAny<string>());

            Assert.IsNotNull(result);
        }
    }
}
