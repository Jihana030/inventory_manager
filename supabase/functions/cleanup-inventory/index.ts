import {createClient} from "@supabase/supabase-js";


const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

Deno.serve(async () => {
  try {
    // 1년 전 날짜
    const targetDate = new Date();
    targetDate.setFullYear(targetDate.getFullYear() - 1);

    // 삭제 대상 조회
    const { data: items, error: selectError } = await supabase
        .from("inventory")
        .select("no, thumbnail")
        .lt("deleted_at", targetDate.toISOString());

    if (selectError) {
      throw selectError;
    }

    if (!items || items.length === 0) {
      return new Response(
          JSON.stringify({
            message: "삭제할 상품이 없습니다.",
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
    }

    // Storage 이미지 삭제
      const paths = items
          .map(item => item.thumbnail)
          .filter((path): path is string => !!path);

    if (paths.length > 0) {
      const { error } = await supabase.storage
          .from("thumbnail")
          .remove(paths);

      if (error) throw error;
    }

    // DB 삭제
    const ids = items.map((item) => item.no);

    const { error: deleteError } = await supabase
        .from("inventory")
        .delete()
        .in("no", ids);

    if (deleteError) {
      throw deleteError;
    }

    return new Response(
        JSON.stringify({
          success: true,
          deletedCount: ids.length,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
  } catch (err) {
    console.error(err);

    return new Response(
        JSON.stringify({
          success: false,
          error: err,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
    );
  }
});