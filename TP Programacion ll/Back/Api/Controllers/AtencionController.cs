using Microsoft.AspNetCore.Mvc;
using Back.Models;
using Back.Repositories;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AtencionController : Controller
    {
        private IAtencionRepository _repository;
        public AtencionController(IAtencionRepository repository)
        {
            _repository = repository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                return Ok(_repository.GetById(id));
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
        [HttpDelete]
        public IActionResult Delete(int id)
        {
            try
            {
                return Ok(_repository.Delete(id));
            }
            catch (Exception)
            {
                return BadRequest("Error Interno");
            }
        }
        [HttpPut]
        public IActionResult Put([FromBody] Atencion obj)
        {
            try
            {
                return Ok(_repository.Update(obj));
            }
            catch (Exception)
            {

                return BadRequest("Error Interno");
            }
        }
        [HttpPost]
        public IActionResult Post([FromBody] Atencion obj)
        {
            try
            {
                return Ok(_repository.Create(obj));
            }
            catch (Exception)
            {

                return BadRequest("Error Interno");
            }
        }
    }
}
