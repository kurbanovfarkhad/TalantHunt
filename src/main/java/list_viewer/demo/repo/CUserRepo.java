package list_viewer.demo.repo;

import list_viewer.demo.domain.CommonUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CUserRepo extends JpaRepository<CommonUser,Long> {
}
