package com.himedia.nuovo_project.repository;

import com.himedia.nuovo_project.dto.Inquiry;
import com.himedia.nuovo_project.dto.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Integer> {


  List<Reply> getRepliesByBoardId(int id);
}
