using Back.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipoController : Controller
    {
        private ITipoRepository _repository;
        public TipoController(ITipoRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_repository.GetAllTipos());
            }
            catch (Exception)
            {
                return BadRequest("Error Interno");
            }
        }
    }
}
