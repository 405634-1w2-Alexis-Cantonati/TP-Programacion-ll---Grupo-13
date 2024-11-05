using Back.Models;
using Back.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations.Schema;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private IClienteRepository _repository;
        public ClienteController(IClienteRepository repository)
        {
            _repository = repository;
        }
        [HttpPost]
        public IActionResult Post([FromBody] Cliente obj)
        {
            try
            {
                if (!string.IsNullOrEmpty(obj.Nombre) && !string.IsNullOrEmpty(obj.Sexo))
                {
                    return Ok(_repository.Create(obj));
                }
                throw new Exception();
            }
            catch (Exception)
            {

                return BadRequest("Error Interno");
            }
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                return Ok(_repository.GetAll());
            }
            catch (Exception)
            {
                return BadRequest("Error Interno");
            }
        }
    }
}
