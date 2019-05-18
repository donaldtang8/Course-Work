valueOf({numExp, {num, _, N}}, _) -> {num, N};
valueOf({idExp,{id, _, Id}}, Env) -> env:lookup(Id, Env);
valueOf({diffExp, {Exp1, Exp2}}, Env) -> {num, numVal2Num(valueOf(Exp1, Env)) - numVal2Num(valueOf(Exp2, Env))};
valueOf({plusExp, {Exp1, Exp2}}, Env) -> {num, numVal2Num(valueOf(Exp1, Env)) + numVal2Num(valueOf(Exp2, Env))};
valueOf({isZeroExp, Exp}, Env) -> {bool, numVal2Num(valueOf(Exp,Env))==0};
valueOf({letExp,{Id,Exp1,Exp2}}, Env) -> valueOf(Exp2, env:add(Env, Id, valueOf(Exp1, Env)));

valueOf({procExp,{Id,Exp}}, Env) -> {proc,Id, Exp,Env};

valueOf({appExp,{Exp1,Exp2}},Env) -> 
    Proc = valueOf(Exp1,Env),
    Args = valueOf(Exp2,Env),
    applyProcedure(Proc,Args);

valueOf({ifThenElseExp,{Exp1,Exp2,Exp3}}, Env) -> 
    if boolVal2Bool(valueOf(Exp1, Env)) ->
        valueOf(Exp2,Env);
    true ->
        valueOf(Exp3,Env)
    end.

applyProcedure(Procedure,Arg) ->
    case Procedure of
        {proc,Id,Exp,Env} ->
            valueOf(Exp,enE:add(Env,Id,Arg))
    end.