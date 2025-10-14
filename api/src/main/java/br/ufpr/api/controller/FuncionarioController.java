package br.ufpr.api.controller;

import br.ufpr.api.model.entity.Chamado;
import br.ufpr.api.model.entity.Funcionario;
import br.ufpr.api.model.responses.BaseResponse;
import br.ufpr.api.service.ChamadoService;
import br.ufpr.api.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "funcionario", consumes = "application/json", produces = "application/json")
class FuncionarioController {
    @ControllerAdvice
    public class GlobalExceptionHandler { //interceptador de exceções
        @ExceptionHandler({ Exception.class })
        public ResponseEntity<BaseResponse> lidarExcessaoGenerica(Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponse(ex.getMessage()));
        }
    }

    @Autowired
    final FuncionarioService funcionarioService;
    @Autowired
    final ChamadoService chamadoService;

    @GetMapping
    public ResponseEntity<BaseResponse> getTodosFuncionarios() throws Exception {
        try {
            List<Funcionario> funcionarios = funcionarioService.getTodos();
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(funcionarios));
        } catch (Exception e) {
            throw new Exception("Erro ao buscar funcionários.");
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getFuncionario(@PathVariable Long id) throws Exception {
        try{
            var optional = funcionarioService.encontrarPorId(id);
            if(optional.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse("Funcionário não encontrado."));
            }
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(optional.get()));
        } catch (Exception e) {
            throw new Exception("Erro ao buscar funcionário.");
        }
    }

    @GetMapping("/home")
    public ResponseEntity<BaseResponse> getHomeFuncionario() throws Exception {
        try {
            List<Chamado> chamados = chamadoService.getAllChamados(); //filtrar chamados em aberto
            return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(chamados));
        } catch (Exception e) {
            throw new Exception("Erro ao buscar pedidos.");
        }
    }
}
